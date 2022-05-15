import pickle
import time

from sklearn import preprocessing
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder

from Context import getOneHotEncoderFilePath_SL
from SickitLearnVersion.Operations.Helpers.ReadWriteFiler import readData
from SickitLearnVersion.ml.ClassificatorsAndRegressors import ClassificatorsAndRegressors


def createModel(params):
    data = readData()
    start = time.time()

    X, y = extractData(data, params['label'], params['features'])
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=1-params['options']['trainSize'], random_state=40)

    mlProblem = ClassificatorsAndRegressors(X_train, X_test, y_train, y_test) \
        .chooseTypeOfProblem(params['options']['typeOfProblem'])
    print(mlProblem)

    mlModel = mlProblem.chooseMethod(params['options']['method'], params['hyperparameters'])
    print(mlModel)

    prediction = mlProblem.fitAndPredict(mlModel)
    print(prediction)

    result = mlProblem.calculateMetrics(prediction)
    result.setTime(time=time.time() - start)
    print(result.time)

    return result


def extractData(data, label, features):
    x = data[features]
    enc = OneHotEncoder(handle_unknown='ignore')
    enc.fit(x)
    pickle.dump(enc, open(getOneHotEncoderFilePath_SL(), 'wb'))
    X = enc.transform(x)
    y = data[[label]]
    return X, y
