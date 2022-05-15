import time

from pyspark.ml.feature import VectorAssembler, StringIndexer
from pyspark.sql.types import StringType

import Context
from SparkVersion.Operations.Helpers.ReadWriteFiler import readData
from SparkVersion.ml.ClassificatorsAndRegressors import ClassificatorsAndRegressors


def createModel(params):
    data = readData()
    start = time.time()

    preparedData = extractData(data, params['label'], params['features'])
    (train, test) = preparedData.randomSplit([params['options']['trainSize'], 1-params['options']['trainSize']])

    mlProblem = ClassificatorsAndRegressors(preparedData, train, test)\
        .chooseTypeOfProblem(params['options']['typeOfProblem'])

    mlModel = mlProblem.chooseMethod(params['options']['method'], params['hyperparameters'])

    prediction = mlProblem.fitAndTransform(mlModel)

    result = mlProblem.calculateMetrics(prediction)
    result.setTime(time=time.time() - start)

    return result


def extractData(data, label, features):
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
    textFeaturesIndexer.write().overwrite().save(Context.getTextFeatureIndexerFilePath())
    newData = textFeaturesIndexer.transform(data)
    return VectorAssembler(
        inputCols=newFeatures,
        outputCol="features"
    ).transform(newData).withColumnRenamed(label, "label").select("features", "label")

