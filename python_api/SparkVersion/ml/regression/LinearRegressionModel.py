from pyspark.ml.regression import LinearRegression


class LinearRegressionModel:
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters['linearRegressionModel']

    def prepareModel(self):
        if self.hyperparameters is None:
            return LinearRegression(
                featuresCol='indexedFeatures',
                labelCol='label'
            )
        else:
            return LinearRegression(
                regParam=self.hyperparameters.get('regParam', 0.0),
                fitIntercept=self.hyperparameters.get('fitIntercept', True),
                standardization=self.hyperparameters.get('standardization', True),
                elasticNetParam=self.hyperparameters.get('elasticNetParam', 0.0),
                maxIter=self.hyperparameters.get('maxIter', 100),
                tol=self.hyperparameters.get('tol', 1E-6),
                solver=self.hyperparameters.get('solver', "auto"),
                aggregationDepth=self.hyperparameters.get('aggregationDepth', 2),
                epsilon=self.hyperparameters.get('epsilon', 1.35),
                loss=self.hyperparameters.get('loss', "squaredError"),
                featuresCol='indexedFeatures',
                labelCol='label'
            )
