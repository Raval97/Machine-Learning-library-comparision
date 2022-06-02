from pyspark.ml import Pipeline
from pyspark.ml.evaluation import MulticlassClassificationEvaluator
from pyspark.ml.feature import VectorIndexer, IndexToString, StringIndexer

from Context import getPipelineModelFilePath
from Models.ClassificationSummaryResult import ClassificationSummaryResult
from Models.SummaryResult import SummaryResult
from SparkVersion.ml.classification.DecisionTreeClassificationModel import DecisionTreeClassificationModel
from SparkVersion.ml.classification.LogisticRegressionModel import LogisticRegressionModel
from SparkVersion.ml.classification.NaiveBayesClassificationModel import NaiveBayesClassificationModel
from SparkVersion.ml.classification.RandomForrestClassificationModel import RandomForrestClassificationModel


class Classificators:
    def __init__(self, data, train, test, maxCategories=4):
        self.data = data
        self.train = train
        self.test = test
        self.maxCategories = maxCategories

    @staticmethod
    def chooseMethod(method, hyperparameters):
        if method == "Logistic regression":
            return LogisticRegressionModel(hyperparameters).prepareModel()
        elif method == "Decision tree classifier":
            return DecisionTreeClassificationModel(hyperparameters).prepareModel()
        elif method == "Random forest classifier":
            return RandomForrestClassificationModel(hyperparameters).prepareModel()
        else:
            return NaiveBayesClassificationModel(hyperparameters).prepareModel()

    def fitAndTransform(self, regressionModel):
        pipeline = Pipeline(stages=[self.labelIndexer(), self.featureIndexer(), regressionModel, self.labelConverter()])
        model = pipeline.fit(self.train)
        predictions = model.transform(self.test)
        model.write().overwrite().save(getPipelineModelFilePath())
        return predictions

    @staticmethod
    def calculateMetrics(predictions):
        evaluator = MulticlassClassificationEvaluator(
            labelCol="indexedLabel",
            predictionCol="prediction"
        )
        accuracy = evaluator.setMetricName("accuracy").evaluate(predictions)
        precision = evaluator.setMetricName("weightedPrecision").evaluate(predictions)
        f1 = evaluator.setMetricName("f1").evaluate(predictions)
        weightedRecall = evaluator.setMetricName("weightedRecall").evaluate(predictions)
        hammingLoss = evaluator.setMetricName("hammingLoss").evaluate(predictions)
        metrics = ClassificationSummaryResult(accuracy, 1.0 - accuracy, precision, f1, weightedRecall, hammingLoss)
        return SummaryResult(classificationMetrics=metrics)

    def labelIndexer(self):
        return StringIndexer(
            inputCol="label",
            outputCol="indexedLabel"
        ).fit(self.data)

    def featureIndexer(self):
        return VectorIndexer(
            inputCol="features",
            outputCol="indexedFeatures",
            maxCategories=self.maxCategories
        ).fit(self.data)

    def labelConverter(self):
        return IndexToString(
            inputCol="prediction",
            outputCol="predictedLabel",
            labels=self.labelIndexer().labels
        )

    @staticmethod
    def indexOfFeatureIndexer():
        return 1

    @staticmethod
    def predictionColumn():
        return "predictedLabel"
