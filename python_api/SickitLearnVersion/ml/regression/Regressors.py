import pickle

from sklearn.metrics import r2_score, mean_squared_error

import Context
from Context import getMlModelFilePath_SL
from Models.RegressionSummaryResult import RegressionSummaryResult
from Models.SummaryResult import SummaryResult
from SickitLearnVersion.ml.regression.DecisionTreeRegressionModel import DecisionTreeRegressionModel
from SickitLearnVersion.ml.regression.LinearRegressionModel import LinearRegressionModel
from SickitLearnVersion.ml.regression.RandomForrestRegressionModel import RandomForrestRegressionModel


class Regressors:
    def __init__(self, X_train, X_test, y_train, y_test):
        self.X_train = X_train
        self.X_test = X_test
        self.y_train = y_train
        self.y_test = y_test

    @staticmethod
    def chooseMethod(method, hyperparameters):
        if method == "Linear regression":
            return LinearRegressionModel(hyperparameters).prepareModel()
        elif method == "Decision tree regression":
            return DecisionTreeRegressionModel(hyperparameters).prepareModel()
        else:
            return RandomForrestRegressionModel(hyperparameters).prepareModel()

    def fitAndPredict(self, regressionModel):
        regressionModel.fit(self.X_train, self.y_train)
        prediction = regressionModel.predict(self.X_test)
        if Context.saveModels:
            pickle.dump(regressionModel, open(getMlModelFilePath_SL(), 'wb'))
        return prediction

    def calculateMetrics(self, predictions):
        rmse = mean_squared_error(self.y_test, predictions)
        r2 = r2_score(self.y_test, predictions)
        metrics = RegressionSummaryResult(r2, rmse)
        return SummaryResult(regressionMetrics = metrics)
