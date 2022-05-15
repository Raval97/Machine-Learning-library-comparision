from pyspark.ml.regression import GeneralizedLinearRegression


class GeneralizedLinearRegressionModel:
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters['generalizedLinearRegressionModel']

    def prepareModel(self):
        if self.hyperparameters is None:
            return GeneralizedLinearRegression(
                featuresCol='indexedFeatures',
                labelCol='label'
            )
        else:
            return GeneralizedLinearRegression(
                family=self.hyperparameters.get('family', "gaussian"),
                variancePower=self.hyperparameters.get('variancePower', 0.0),
                regParam=self.hyperparameters.get('regParam', 0.0),
                fitIntercept=self.hyperparameters.get('fitIntercept', True),
                maxIter=self.hyperparameters.get('maxIter', 100),
                tol=self.hyperparameters.get('tol', 1E-6),
                solver=self.hyperparameters.get('solver', "auto"),
                aggregationDepth=self.hyperparameters.get('aggregationDepth', 2),
                featuresCol='indexedFeatures',
                labelCol='label'
            )
