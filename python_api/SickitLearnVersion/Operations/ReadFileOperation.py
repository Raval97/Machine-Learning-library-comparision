import pandas as pd

import Context
from SickitLearnVersion.Operations.Helpers.ReadWriteFiler import safeData
from SickitLearnVersion.Operations.Helpers.StatisticsCreator import createStatisticsSummary


def readFile(filename):
    df = pd.read_csv(Context.defaultDirectoryPath + filename).dropna()
    safeData(df)
    summary = createStatisticsSummary(df)
    return summary
