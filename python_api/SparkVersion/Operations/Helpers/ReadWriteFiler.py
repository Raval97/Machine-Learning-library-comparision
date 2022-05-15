from Context import getDataFrameFilePath, spark


def safeData(data, path=getDataFrameFilePath()):
    data.write.mode('overwrite').save(path)


def readData(path=getDataFrameFilePath()):
    return spark.read.load(path)
