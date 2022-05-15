from sklearn import linear_model


class LinearRegressionModel:
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters['linearRegressionModel']

    def prepareModel(self):
        if self.hyperparameters is None:
            return linear_model.LinearRegression()
        else:
            print(self.hyperparameters)
            return linear_model.LinearRegression(
                fit_intercept=self.hyperparameters.get('fitIntercept', True),
                copy_X=self.hyperparameters.get('copyX', True),
                n_jobs=self.hyperparameters.get('nJobs', None),
                positive=self.hyperparameters.get('positive', False)
            )
