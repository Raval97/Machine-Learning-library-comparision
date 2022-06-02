from flask import Flask, json, request, redirect
from flask_cors import CORS

import Context
from SickitLearnVersion.Operations.CreateModelOperation import createModel as ScikitLearn_createModel
from SickitLearnVersion.Operations.PredictOperation import predict as ScikitLearn_predict
from SickitLearnVersion.Operations.ReadFileOperation import readFile as ScikitLearn_readFile
from SparkVersion.Operations.CreateModelOperation import createModel as Spark_createModel
from SparkVersion.Operations.PredictOperation import predict as Spark_predict
from SparkVersion.Operations.ReadFileOperation import readFile as Spark_readFile
from SparkVersion.Operations.UpdateDataOperation import castToInt as Spark_castToInt

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = Context.workspaceDirectoryPath
cors = CORS(app, resources={r"/*": {"origins": "*"}})


def to_json(obj):
    return json.dumps(obj, default=lambda obj: obj.__dict__)


#################################
######### Saprk Api #############
#################################
@app.route('/sparkApi/upload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['myFile']
        file.save(Context.getDatSetFilePath())
        return redirect('/sparkApi/load?param=' + file.filename)


@app.route('/sparkApi/load', methods=['POST', 'GET'])
def readFileOperationSpark():
    params = request.args.get("param")
    print(params)
    result = Spark_readFile(params)
    response = app.response_class(
        response=to_json(result),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/sparkApi/createModel', methods=['POST'])
def createModelOperationSpark():
    params = json.loads(request.data)
    print(params)
    result = Spark_createModel(params)
    response = app.response_class(
        response=to_json(result),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/sparkApi/predict', methods=['POST'])
def predictOperationSpark():
    params = json.loads(request.data)
    print(params)
    result = Spark_predict(params)
    print(result)
    return str(result)


@app.route('/sparkApi/castToInt', methods=['POST'])
def castToIntOperationSpark():
    param = request.args.get("param")
    print(param)
    result = Spark_castToInt(param)
    response = app.response_class(
        response=to_json(result),
        status=200,
        mimetype='application/json'
    )
    return response


#################################
###### ScikitLearn Api ##########
#################################
@app.route('/scikitLearnApi/upload', methods=['POST'])
def upload_file2():
    if request.method == 'POST':
        file = request.files['myFile']
        file.save(Context.getDatSetFilePath_SL())
        return redirect('/scikitLearnApi/load?param=' + file.filename)


@app.route('/scikitLearnApi/load', methods=['POST', 'GET'])
def loadFileOperationScikitLearn():
    param = request.args.get("param")
    print(param)
    result = ScikitLearn_readFile(param)
    response = app.response_class(
        response=to_json(result),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/scikitLearnApi/createModel', methods=['POST'])
def createModelOperationScikitLearn():
    params = json.loads(request.data)
    print(params)
    result = ScikitLearn_createModel(params)
    response = app.response_class(
        response=to_json(result),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route('/scikitLearnApi/predict', methods=['POST'])
def predictOperationScikitLearn():
    params = json.loads(request.data)
    print(params)
    result = ScikitLearn_predict(params)
    print(result)
    return str(result)


if __name__ == '__main__':
    app.run(debug=True)
