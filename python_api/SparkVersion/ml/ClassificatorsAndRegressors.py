from SparkVersion.ml.regression.Regressors import Regressors
from SparkVersion.ml.classification.Classificators import Classificators


class ClassificatorsAndRegressors:
    def __init__(self, data, train, test, maxCategories=4):
        self.data = data
        self.train = train
        self.test = test
        self.maxCategories = maxCategories

    def chooseTypeOfProblem(self, typeOfProblem):
        if typeOfProblem == "Regression":
            return Regressors(self.data, self.train, self.test)
        else:
            return Classificators(self.data, self.train, self.test)
