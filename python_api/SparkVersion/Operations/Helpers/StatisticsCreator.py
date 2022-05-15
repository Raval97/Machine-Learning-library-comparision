from pyspark.sql.functions import col
from pyspark.sql.types import StringType
from pyspark.sql import functions as F

from Models.DataStatistics import DataStatistics
from Models.IntStringTuple import IntStringTuple
from Models.NumberColumnsSummary import NumberColumnsSummary
from Models.TextColumnsSummary import TextColumnsSummary


def createStatisticsSummary(data):
    return DataStatistics(textColumnsSummary(data), numberColumnsSummary(data))


def textColumnsSummary(data):
    textColumnNames = [field.name for field in data.schema.fields if (isinstance(field.dataType, StringType))]
    textColumn = data.select(*textColumnNames)
    textColumnsSummaries = [textColumnsSummaryFromNames(name, textColumn) for name in textColumnNames]
    return textColumnsSummaries


def numberColumnsSummary(data):
    numberColumnNames = [field.name for field in data.schema.fields if not (isinstance(field.dataType, StringType))]
    numberColumn = data.select(*numberColumnNames)
    summary = numberColumn.summary()
    numberColumnsSummaries = [numberColumnsSummaryFromNames(name, summary) for name in numberColumnNames]
    return numberColumnsSummaries


def textColumnsSummaryFromNames(name, textColumn):
    count = textColumn.count()
    df_temp = textColumn.select(name) \
        .groupBy(name) \
        .agg((F.count(F.lit(1)) / textColumn.count()).alias("frequency")) \
        .sort(col("frequency").desc())
    distinct = df_temp.count()
    bestName = df_temp.collect()[0].__getitem__(name)
    bestCount = df_temp.collect()[0].__getitem__("frequency")
    secondName = df_temp.collect()[1].__getitem__(name)
    secondCount = df_temp.collect()[1].__getitem__("frequency")
    mostCommons = [
        IntStringTuple(bestName, bestCount),
        IntStringTuple(secondName, secondCount)
    ]
    summary = TextColumnsSummary(name, count, distinct, mostCommons)
    return summary


def numberColumnsSummaryFromNames(name, summary):
    return NumberColumnsSummary(
        name = name,
        count = summary.collect()[0].__getitem__(name),
        mean = summary.collect()[1].__getitem__(name),
        stdDev = summary.collect()[2].__getitem__(name),
        min = summary.collect()[3].__getitem__(name),
        percentage25 = summary.collect()[4].__getitem__(name),
        percentage50 = summary.collect()[5].__getitem__(name),
        percentage75 = summary.collect()[6].__getitem__(name),
        max = summary.collect()[7].__getitem__(name),
    )
