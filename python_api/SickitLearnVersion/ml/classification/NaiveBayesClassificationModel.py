from sklearn import naive_bayes


class NaiveBayesClassificationModel:
    def __init__(self, hyperparameters):
        self.hyperparameters = hyperparameters['naiveBayesModel']

    def prepareModel(self):
        if self.hyperparameters is None:
            return naive_bayes.GaussianNB()
        else:
            return naive_bayes.GaussianNB(
                priors=self.hyperparameters.get('priors', None),
                var_smoothing=self.hyperparameters.get('varSmoothing', 1e-9),
            )
