from pyspark.ml import Pipeline
from pyspark.ml.evaluation import RegressionEvaluator
from pyspark.ml.feature import VectorIndexer

import Context
from Models.RegressionSummaryResult import RegressionSummaryResult
from Models.SummaryResult import SummaryResult
from SparkVersion.ml.regression.DecisionTreeRegressionModel import DecisionTreeRegressionModel
from SparkVersion.ml.regression.GeneralizedLinearRegressionModel import GeneralizedLinearRegressionModel
from SparkVersion.ml.regression.LinearRegressionModel import LinearRegressionModel
from Context import getPipelineModelFilePath
from SparkVersion.ml.regression.RandomForrestRegressionModel import RandomForrestRegressionModel


class Regressors:
    def __init__(self, data, train, test, maxCategories=4):
        self.data = data
        self.train = train
        self.test = test
        self.maxCategories = maxCategories

    @staticmethod
    def chooseMethod(method, hyperparameters):
        if method == "Linear regression":
            return LinearRegressionModel(hyperparameters).prepareModel()
        elif method == "Generalized Linear regression":
            return GeneralizedLinearRegressionModel(hyperparameters).prepareModel()
        elif method == "Decision tree regression":
            return DecisionTreeRegressionModel(hyperparameters).prepareModel()
        else:
            return RandomForrestRegressionModel(hyperparameters).prepareModel()

    def fitAndTransform(self, regressionModel):
        pipeline = Pipeline().setStages([self.featureIndexer(), regressionModel])
        model = pipeline.fit(self.train)
        predictions = model.transform(self.test)
        if Context.saveModels:
            model.write().overwrite().save(getPipelineModelFilePath())
        return predictions

    @staticmethod
    def calculateMetrics(predictions):
        evaluatorRMSE = RegressionEvaluator(
            predictionCol="prediction",
            metricName="rmse"
        )
        evaluatorR2 = RegressionEvaluator(
          predictionCol="prediction",
          metricName ="r2"
        )
        rmse = evaluatorRMSE.evaluate(predictions)
        r2 = evaluatorR2.evaluate(predictions)
        metrics = RegressionSummaryResult(r2, rmse)
        return SummaryResult(regressionMetrics = metrics)

    def featureIndexer(self):
        return VectorIndexer(
            inputCol="features",
            outputCol="indexedFeatures",
            maxCategories=self.maxCategories
        ).fit(self.data)

    @staticmethod
    def indexOfFeatureIndexer():
        return 0

    @staticmethod
    def predictionColumn():
        return "prediction"
