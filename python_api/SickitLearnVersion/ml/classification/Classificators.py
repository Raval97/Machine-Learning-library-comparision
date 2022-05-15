import pickle

import numpy as np

from Context import getMlModelFilePath_SL
from Models.ClassificationSummaryResult import ClassificationSummaryResult
from Models.SummaryResult import SummaryResult
from SickitLearnVersion.ml.classification.DecisionTreeClassificationModel import DecisionTreeClassificationModel
from SickitLearnVersion.ml.classification.LogisticRegressionModel import LogisticRegressionModel
from SickitLearnVersion.ml.classification.NaiveBayesClassificationModel import NaiveBayesClassificationModel
from SickitLearnVersion.ml.classification.RandomForrestClassificationModel import RandomForrestClassificationModel
from sklearn.metrics import accuracy_score, precision_score, f1_score, recall_score, hamming_loss


class Classificators:
    def __init__(self, X_train, X_test, y_train, y_test):
        self.X_train = X_train
        self.X_test = X_test
        self.y_train = y_train
        self.y_test = y_test

    @staticmethod
    def chooseMethod(method, hyperparameters):
        if method == "Logistic regression":
            return LogisticRegressionModel(hyperparameters).prepareModel()
        elif method == "Decision tree classifier":
            return DecisionTreeClassificationModel(hyperparameters).prepareModel()
        elif method == "Random forest classifier":
            return RandomForrestClassificationModel(hyperparameters).prepareModel()
        else:
            return NaiveBayesClassificationModel(hyperparameters).prepareModel()

    def fitAndPredict(self, regressionModel):
        regressionModel.fit(self.X_train, self.y_train)
        prediction = regressionModel.predict(self.X_test)
        pickle.dump(regressionModel, open(getMlModelFilePath_SL(), 'wb'))
        return prediction

    def calculateMetrics(self, predictions):
        accuracy = accuracy_score(self.y_test, predictions)
        precision = precision_score(self.y_test, predictions, average='weighted')
        f1 = f1_score(self.y_test, predictions, average='weighted')
        weightedRecall = recall_score(self.y_test, predictions, average='weighted')
        hammingLoss = hamming_loss(self.y_test, predictions)
        metrics = ClassificationSummaryResult(accuracy, 1.0 - accuracy, precision, f1, weightedRecall, hammingLoss)
        print("accuracy:", accuracy)
        print("error:", 1.0 - accuracy)
        print("precision:", precision)
        print("f1:", f1)
        print("weightedRecall:", weightedRecall)
        print("hammingLoss:", hammingLoss)
        return SummaryResult(classificationMetrics=metrics)
