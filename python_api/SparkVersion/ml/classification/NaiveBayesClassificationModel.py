from pyspark.ml.classification import NaiveBayes


class NaiveBayesClassificationModel:
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters['naiveBayesModel']

    def prepareModel(self):
        if self.hyperparameters is None:
            return NaiveBayes(
                featuresCol='indexedFeatures',
                labelCol='indexedLabel'
            )
        else:
            return NaiveBayes(
                smoothing=self.hyperparameters.get('smoothing', 1),
                modelType=self.hyperparameters.get('modelType', "multinomial"),
                featuresCol='indexedFeatures',
                labelCol='indexedLabel'
            )
