from SickitLearnVersion.ml.classification.Classificators import Classificators
from SickitLearnVersion.ml.regression.Regressors import Regressors


class ClassificatorsAndRegressors:
    def __init__(self, X_train, X_test, y_train, y_test):
        self.X_train = X_train
        self.X_test = X_test
        self.y_train = y_train
        self.y_test = y_test

    def chooseTypeOfProblem(self, typeOfProblem):
        if typeOfProblem == "Regression":
            return Regressors(self.X_train, self.X_test, self.y_train, self.y_test)
        else:
            return Classificators(self.X_train, self.X_test, self.y_train, self.y_test)
