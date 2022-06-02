import json

from pyspark.ml import PipelineModel
from pyspark.ml.feature import VectorAssembler, StringIndexerModel

import Context
from SparkVersion.ml.classification.Classificators import Classificators
from SparkVersion.ml.regression.Regressors import Regressors


def predict(params):
    if params['typeOfProblem'] == "Regression":
        return makePredict(params, Regressors.indexOfFeatureIndexer(), Regressors.predictionColumn())
    else:
        return makePredict(params, Classificators.indexOfFeatureIndexer(), Classificators.predictionColumn())


def prepareDataTest(params):
    allFeaturesValues = params['numberFeaturesName'] + params['textFeaturesName']
    allFeaturesNames = params['numberFeatures'] + params['textFeatures']
    features = dict(zip(allFeaturesValues, allFeaturesNames))
    jsonStr = json.dumps(features)
    rdd = Context.spark.sparkContext.parallelize([jsonStr])
    return Context.spark.read.json(rdd)


def makePredict(params, index, predictColumn):
    pipelineModel = PipelineModel.load(Context.getPipelineModelFilePath())
    textFeatureIndexer = StringIndexerModel.load(Context.getTextFeatureIndexerFilePath())
    featureIndexer = pipelineModel.stages[index]  # .asInstanceOf[VectorIndexerModel]
    test = prepareDataTest(params)

    data2 = textFeatureIndexer.transform(test)
    data3 = VectorAssembler(
        inputCols=allFeaturesIndexesNames(params),
        outputCol="features"
    ).transform(data2)
    data4 = featureIndexer.transform(data3)
    return pipelineModel \
        .transform(data4)\
        .collect()[0].__getitem__(predictColumn)


def allFeaturesIndexesNames(params):
    def setIndexesName(name):
        return str(name) + "_index"

    textFeaturesIndexesNames = [setIndexesName(name) for name in params['textFeaturesName']]
    return params['numberFeaturesName'] + textFeaturesIndexesNames
