from pyspark.ml.classification import LogisticRegression


class LogisticRegressionModel:
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters['logisticRegressionModel']

    def prepareModel(self):
        if self.hyperparameters is None:
            return LogisticRegression(
                featuresCol='indexedFeatures',
                labelCol='indexedLabel'
            )
        else:
            return LogisticRegression(
                regParam=self.hyperparameters.get('regParam', 0.0),
                fitIntercept=self.hyperparameters.get('fitIntercept', True),
                standardization=self.hyperparameters.get('standardization', True),
                elasticNetParam=self.hyperparameters.get('elasticNetParam', 0.0),
                maxIter=self.hyperparameters.get('maxIter', 100),
                tol=self.hyperparameters.get('tol', 1E-6),
                family=self.hyperparameters.get('family', "auto"),
                aggregationDepth=self.hyperparameters.get('aggregationDepth', 2),
                threshold=self.hyperparameters.get('threshold', 0.5),
                featuresCol='indexedFeatures',
                labelCol='indexedLabel'
            )
