from sklearn import tree


class DecisionTreeClassificationModel:
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters['decisionTreeRegModel']

    def prepareModel(self):
        if self.hyperparameters is None:
            return tree.DecisionTreeClassifier()
        else:
            print(self.hyperparameters)
            return tree.DecisionTreeClassifier(
                criterion=self.hyperparameters.get('criterion', "squared_error"),
                splitter=self.hyperparameters.get('splitter', "best"),
                max_depth=self.hyperparameters.get('maxDepth', None),
                min_samples_split=self.hyperparameters.get('minSamplesSplit', 2),
                min_samples_leaf=self.hyperparameters.get('minSamplesLeaf', 1),
                min_weight_fraction_leaf=self.hyperparameters.get('min_weight_fraction_leaf', 0.0),
                max_features=self.hyperparameters.get('maxFeatures', None),
                random_state=self.hyperparameters.get('randomState', None),
                max_leaf_nodes=self.hyperparameters.get('maxLeaf_Nodes', None),
                min_impurity_decrease=self.hyperparameters.get('minImpurityDecrease', 0.0),
                ccp_alpha=self.hyperparameters.get('ccpAlpha', 0.0),
            )
