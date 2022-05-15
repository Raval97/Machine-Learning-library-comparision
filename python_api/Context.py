from pyspark.sql import SparkSession

spark = SparkSession.builder.appName('app').getOrCreate()

workspaceDirectoryPath = "../../data_sets/workspace/spark/"
workspaceDirectoryPath_SL = "../../data_sets/workspace/scikit-learn/"
defaultDirectoryPath = "../../data_sets/default/"

fileName = "dataSet.csv"
dataFrameFileName = "dataFrame"
pipelineModelFileName = "pipelineModel"
textFeatureIndexerFileName = "textFeatureIndexer"
mlModelFileName = "mlModel"
oneHotEncoderFileName = "encoder"


##########################################################
def getDatSetFilePath_SL():
    return workspaceDirectoryPath_SL + fileName


def getDataFrameFilePath_SL():
    return workspaceDirectoryPath_SL + dataFrameFileName


def getMlModelFilePath_SL():
    return workspaceDirectoryPath_SL + mlModelFileName


def getOneHotEncoderFilePath_SL():
    return workspaceDirectoryPath_SL + oneHotEncoderFileName
##########################################################


def getDatSetFilePath():
    return workspaceDirectoryPath + fileName


def getDataFrameFilePath():
    return workspaceDirectoryPath + dataFrameFileName


def getPipelineModelFilePath():
    return workspaceDirectoryPath + pipelineModelFileName


def getTextFeatureIndexerFilePath():
    return workspaceDirectoryPath + textFeatureIndexerFileName
