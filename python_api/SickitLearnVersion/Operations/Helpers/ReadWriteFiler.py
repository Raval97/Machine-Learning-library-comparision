import pandas as pd

import Context


def safeData(data, path=Context.getDataFrameFilePath_SL()):
    data.to_pickle(path)


def readData(path=Context.getDataFrameFilePath_SL()):
    return pd.read_pickle(path)
