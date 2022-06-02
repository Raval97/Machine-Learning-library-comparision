from Models.DataStatistics import DataStatistics
from Models.IntStringTuple import IntStringTuple
from Models.NumberColumnsSummary import NumberColumnsSummary
from Models.TextColumnsSummary import TextColumnsSummary


def createStatisticsSummary(data):
    summary = DataStatistics(textColumnsSummary(data), numberColumnsSummary(data))
    return summary


def textColumnsSummary(data):
    textColumns = list(data.select_dtypes(['object']).columns)
    categoricalColumnNames = [field for field in data if len(data[field].unique()) < 5]
    textAndCategoricalColumns = set(textColumns + categoricalColumnNames)
    textColumnsSummaries = [textColumnsSummaryFromNames(name, data) for name in textAndCategoricalColumns]
    return textColumnsSummaries


def numberColumnsSummary(data):
    numberColumnNames = list(data.select_dtypes(['float64', 'int64']).columns)
    categoricalColumnNames = [field for field in data if len(data[field].unique()) < 5]
    noneTextAndCategoricalColumns = set(numberColumnNames) - set(categoricalColumnNames)
    describe = data.describe()
    numberColumnsSummaries = [numberColumnsSummaryFromNames(name, describe) for name in noneTextAndCategoricalColumns]
    return numberColumnsSummaries


def textColumnsSummaryFromNames(name, data):
    valueCounts = data[name].value_counts()
    count = data.count().get(key = name)
    distinct = data.nunique().get(key = name)
    bestName = valueCounts.index[0]
    bestCount = valueCounts[bestName]
    secondName = "-"
    secondCount = 0
    if distinct > 1:
        secondName = valueCounts.index[1]
        secondCount = valueCounts[secondName]
    mostCommons = [
        IntStringTuple(str(bestName), str(bestCount/count)),
        IntStringTuple(str(secondName), str(secondCount/count))
    ]
    summary = TextColumnsSummary(name, str(count), str(distinct), mostCommons)
    return summary


def numberColumnsSummaryFromNames(name, describe):
    return NumberColumnsSummary(
        name = name,
        count = str(describe.at["count", name]),
        mean = str(describe.at["mean", name]),
        stdDev = str(describe.at["std", name]),
        min = str(describe.at["min", name]),
        percentage25 = str(describe.at["25%", name]),
        percentage50 = str(describe.at["50%", name]),
        percentage75 = str(describe.at["75%", name]),
        max = str(describe.at["max", name])
    )
