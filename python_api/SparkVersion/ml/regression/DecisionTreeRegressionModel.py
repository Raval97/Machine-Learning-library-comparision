from pyspark.ml.regression import DecisionTreeRegressor


class DecisionTreeRegressionModel:
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters['decisionTreeRegModel']

    def prepareModel(self):
        if self.hyperparameters is None:
            return DecisionTreeRegressor(
                featuresCol='indexedFeatures',
                labelCol='label'
            )
        else:
            return DecisionTreeRegressor(
                maxDepth=self.hyperparameters.get('maxDepth', 5),
                maxBins=self.hyperparameters.get('maxBins', 32),
                minInstancesPerNode=self.hyperparameters.get('minInstancesPerNode', 1),
                minWeightFractionPerNode=self.hyperparameters.get('minWeightFractionPerNode', 0),
                minInfoGain=self.hyperparameters.get('minInfoGain', 0),
                maxMemoryInMB=self.hyperparameters.get('maxMemoryInMB', 256),
                cacheNodeIds=self.hyperparameters.get('cacheNodeIds', False),
                checkpointInterval=self.hyperparameters.get('checkpointInterval', 10),
                featuresCol='indexedFeatures',
                labelCol='label'
            )
