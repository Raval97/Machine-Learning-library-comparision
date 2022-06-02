import pickle
import time

from pandas import DataFrame
from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler, MinMaxScaler

import Context
from Context import getOneHotEncoderFilePath_SL
from SickitLearnVersion.Operations.Helpers.ReadWriteFiler import readData
from SickitLearnVersion.ml.ClassificatorsAndRegressors import ClassificatorsAndRegressors


def createModel(params):
    data = readData()
    start = time.time()

    X, y = extractData(data, params['label'], params['features'], params['options']['standardization'])
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=1-params['options']['trainSize'], random_state=40)
    prepareDataTime = time.time() - start
    print("prepareDataTime: ", prepareDataTime)

    mlProblem = ClassificatorsAndRegressors(X_train, X_test, y_train, y_test) \
        .chooseTypeOfProblem(params['options']['typeOfProblem'])

    mlModel = mlProblem.chooseMethod(params['options']['method'], params['hyperparameters'])

    prediction = mlProblem.fitAndPredict(mlModel)

    trainingModelTime = time.time() - start - prepareDataTime
    print("trainingModelTime: ", trainingModelTime)
    result = mlProblem.calculateMetrics(prediction)
    calculateMetricsTime = time.time() - start - trainingModelTime - prepareDataTime
    print("calculateMetricsTime: ", calculateMetricsTime)

    result.setPrepareDataTime(time=prepareDataTime)
    result.setTrainingModelTime(time=trainingModelTime)
    result.setCalculateMetricsTime(time=calculateMetricsTime)

    return result


def extractData(data, label, features, standardization):
    x = data[features]
    if standardization == "MinMaxScaler":
        le = preprocessing.LabelEncoder()
        X = x.apply(le.fit_transform)
        trans = MinMaxScaler()
        X = trans.fit_transform(X)
    elif standardization == "StandardScaler":
        le = preprocessing.LabelEncoder()
        X = x.apply(le.fit_transform)
        trans = StandardScaler()
        X = trans.fit_transform(X)
    else:
        enc = OneHotEncoder(handle_unknown='ignore')
        enc.fit(x)
        if Context.saveModels:
            pickle.dump(enc, open(getOneHotEncoderFilePath_SL(), 'wb'))
        X = enc.transform(x)
    y = data[[label]]
    return X, y