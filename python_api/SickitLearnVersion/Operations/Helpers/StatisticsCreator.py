from Models.DataStatistics import DataStatistics
from Models.IntStringTuple import IntStringTuple
from Models.NumberColumnsSummary import NumberColumnsSummary
from Models.TextColumnsSummary import TextColumnsSummary


def createStatisticsSummary(data):
    summary = DataStatistics(textColumnsSummary(data), numberColumnsSummary(data))
    return summary


def textColumnsSummary(data):
    textColumns = list(data.select_dtypes(['object']).columns)
    textColumnsSummaries = [textColumnsSummaryFromNames(name, data) for name in textColumns]
    return textColumnsSummaries


def numberColumnsSummary(data):
    numberColumns = list(data.select_dtypes(['float64', 'int64']).columns)
    describe = data.describe()
    numberColumnsSummaries = [numberColumnsSummaryFromNames(name, describe) for name in numberColumns]
    return numberColumnsSummaries


def textColumnsSummaryFromNames(name, data):
    valueCounts = data[name].value_counts()
    count = data.count().get(key = name)
    distinct = data.nunique().get(key = name)
    bestName = valueCounts.index[0]
    bestCount = valueCounts[0]
    secondName = valueCounts.index[0]
    secondCount = valueCounts[0]
    mostCommons = [
        IntStringTuple(bestName, str(bestCount/count)),
        IntStringTuple(secondName, str(secondCount/count))
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
