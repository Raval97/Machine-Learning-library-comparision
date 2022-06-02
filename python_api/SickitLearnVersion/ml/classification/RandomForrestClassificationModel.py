from sklearn import ensemble


class RandomForrestClassificationModel:
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters['decisionTreeRegModel']

    def prepareModel(self):
        if self.hyperparameters is None:
            return ensemble.RandomForestClassifier()
        else:
            return ensemble.RandomForestClassifier(
                n_estimators=self.hyperparameters.get('nEstimators', 100),
                criterion=self.hyperparameters.get('criterion', "gini"),
                max_depth=self.hyperparameters.get('maxDepth', None),
                min_samples_split=self.hyperparameters.get('minSamplesSplit', 2),
                min_samples_leaf=self.hyperparameters.get('minSamplesLeaf', 1),
                min_weight_fraction_leaf=self.hyperparameters.get('minWeightFractionLeaf', 0.0),
                max_features=self.hyperparameters.get('maxFeatures', None),
                random_state=self.hyperparameters.get('randomState', None),
                max_leaf_nodes=self.hyperparameters.get('maxLeafNodes', None),
                min_impurity_decrease=self.hyperparameters.get('minImpurityDecrease', 0.0),
                ccp_alpha=self.hyperparameters.get('ccpAlpha', 0.0),
                bootstrap=self.hyperparameters.get('bootstrap', True),
                oob_score=self.hyperparameters.get('oobScore', False),
                n_jobs=self.hyperparameters.get('nJobs', None),
                verbose=self.hyperparameters.get('randomState', 0),
                warm_start=self.hyperparameters.get('verbose', False),
                max_samples=self.hyperparameters.get('classWeight', None)
            )
