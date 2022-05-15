import pickle

from Context import getOneHotEncoderFilePath_SL, getMlModelFilePath_SL


def predict(params):
    encoder = pickle.load(open(getOneHotEncoderFilePath_SL(), 'rb'))
    model = pickle.load(open(getMlModelFilePath_SL(), 'rb'))
    allFeaturesValues = params['numberFeaturesName'] + params['textFeaturesName']
    test = [allFeaturesValues]
    X_text = encoder.transform(test)
    prediction = model.predict(X_text)
    return prediction[0]
