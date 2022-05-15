from sklearn import linear_model


class LogisticRegressionModel:
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters['linearRegressionModel']

    def prepareModel(self):
        if self.hyperparameters is None:
            return linear_model.LogisticRegression()
        else:
            return linear_model.LogisticRegression(
                penalty=self.hyperparameters.get('penalty', "l2"),
                dual=self.hyperparameters.get('dual', False),
                tol=self.hyperparameters.get('tol', 1e-4),
                C=self.hyperparameters.get('C', 1.0),
                fit_intercept=self.hyperparameters.get('fitIntercept', True),
                intercept_scaling=self.hyperparameters.get('interceptScaling', 1),
                solver=self.hyperparameters.get('solver', "lbfgs"),
                max_iter=self.hyperparameters.get('maxIter', 100),
                multi_class=self.hyperparameters.get('multiClass', "auto"),
                verbose=self.hyperparameters.get('verbose', 0),
                warm_start=self.hyperparameters.get('warmStart', False),
                n_jobs=self.hyperparameters.get('nJobs', None),
            )
