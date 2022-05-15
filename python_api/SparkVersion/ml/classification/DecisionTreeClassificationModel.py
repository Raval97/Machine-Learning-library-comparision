from pyspark.ml.classification import DecisionTreeClassifier


class DecisionTreeClassificationModel:
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters['decisionTreeClassModel']

    def prepareModel(self):
        if self.hyperparameters is None:
            return DecisionTreeClassifier(
                featuresCol='indexedFeatures',
                labelCol='indexedLabel'
            )
        else:
            return DecisionTreeClassifier(
                maxDepth=self.hyperparameters.get('maxDepth', 5),
                maxBins=self.hyperparameters.get('maxBins', 32),
                minInstancesPerNode=self.hyperparameters.get('minInstancesPerNode', 1),
                minWeightFractionPerNode=self.hyperparameters.get('minWeightFractionPerNode', 0),
                minInfoGain=self.hyperparameters.get('minInfoGain', 0),
                maxMemoryInMB=self.hyperparameters.get('maxMemoryInMB', 256),
                cacheNodeIds=self.hyperparameters.get('cacheNodeIds', False),
                checkpointInterval=self.hyperparameters.get('checkpointInterval', 10),
                featuresCol='indexedFeatures',
                labelCol='indexedLabel'
            )
