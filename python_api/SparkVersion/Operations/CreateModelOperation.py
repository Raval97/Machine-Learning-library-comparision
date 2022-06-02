import time

from pyspark.ml.feature import VectorAssembler, StringIndexer, StandardScaler, MinMaxScaler
from pyspark.sql.types import StringType

import Context
from SparkVersion.Operations.Helpers.ReadWriteFiler import readData
from SparkVersion.ml.ClassificatorsAndRegressors import ClassificatorsAndRegressors


def createModel(params):
    data = readData()
    start = time.time()

    preparedData = extractData(data, params['label'], params['features'], params['options']['standardization'])
    (train, test) = preparedData.randomSplit([params['options']['trainSize'], 1-params['options']['trainSize']])
    prepareDataTime = time.time() - start

    mlProblem = ClassificatorsAndRegressors(preparedData, train, test)\
        .chooseTypeOfProblem(params['options']['typeOfProblem'])

    mlModel = mlProblem.chooseMethod(params['options']['method'], params['hyperparameters'])

    prediction = mlProblem.fitAndTransform(mlModel)

    trainingModelTime = time.time() - start - prepareDataTime
    result = mlProblem.calculateMetrics(prediction)
    calculateMetricsTime = time.time() - start - trainingModelTime - prepareDataTime

    result.setPrepareDataTime(time=prepareDataTime)
    result.setTrainingModelTime(time=trainingModelTime)
    result.setCalculateMetricsTime(time=calculateMetricsTime)

    return result


def extractData(data, label, features, standardization):
    def setIndexesName(name):
        return name + "_index"

    allTextFutures = [field.name for field in data.schema.fields if (isinstance(field.dataType, StringType))]
    textFeatures = [name for name in features if name in allTextFutures]
    newNameOfTextFeatures = [setIndexesName(name) for name in textFeatures]
    numberFeature = [feature for feature in features if (feature not in textFeatures)]
    newFeatures = numberFeature + newNameOfTextFeatures

    textFeaturesIndexer = StringIndexer(
        inputCols=textFeatures,
        outputCols=newNameOfTextFeatures
    ).fit(data)
    if Context.saveModels:
        textFeaturesIndexer.write().overwrite().save(Context.getTextFeatureIndexerFilePath())
    newData = textFeaturesIndexer.transform(data)
    vector = VectorAssembler(
        inputCols=newFeatures,
        outputCol="nonScaledFeatures"
    ).transform(newData).withColumnRenamed(label, "label").select("nonScaledFeatures", "label")
    if standardization == "StandardScaler":
        sScaler = StandardScaler(withMean=True, withStd=True, inputCol="nonScaledFeatures", outputCol="features")
        return sScaler.fit(vector).transform(vector).select("features", "label")
    elif standardization == "MinMaxScaler":
        mmScaler = MinMaxScaler(inputCol="nonScaledFeatures", outputCol="features")
        return mmScaler.fit(vector).transform(vector).select("features", "label")
    else:
        return vector.withColumnRenamed("nonScaledFeatures", "features")
