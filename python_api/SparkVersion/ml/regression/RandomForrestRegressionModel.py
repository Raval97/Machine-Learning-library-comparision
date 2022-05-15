from pyspark.ml.regression import RandomForestRegressor


class RandomForrestRegressionModel:
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters['randomForrestRegModel']

    def prepareModel(self):
        if self.hyperparameters is None:
            return RandomForestRegressor(
                featuresCol='indexedFeatures',
                labelCol='label'
            )
        else:
            return RandomForestRegressor(
                numTrees=self.hyperparameters.get('numTrees', 20),
                bootstrap=self.hyperparameters.get('bootstrap', True),
                maxDepth=self.hyperparameters.get('maxDepth', 5),
                maxBins=self.hyperparameters.get('maxBins', 32),
                minInstancesPerNode=self.hyperparameters.get('minInstancesPerNode', 1),
                minWeightFractionPerNode=self.hyperparameters.get('minWeightFractionPerNode', 0),
                minInfoGain=self.hyperparameters.get('minInfoGain', 0),
                maxMemoryInMB=self.hyperparameters.get('maxMemoryInMB', 256),
                cacheNodeIds=self.hyperparameters.get('cacheNodeIds', False),
                checkpointInterval=self.hyperparameters.get('checkpointInterval', 10),
                subsamplingRate=self.hyperparameters.get('subsamplingRate', q),
                featureSubsetStrategy=self.hyperparameters.get('featureSubsetStrategy', "auto"),
                featuresCol='indexedFeatures',
                labelCol='label'
            )
