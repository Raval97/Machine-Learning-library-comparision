import React, {Component} from "react";
import AppNavigation from "../routers/AppNavigation";
import axios from "axios";

class App extends Component {
    constructor() {
        super();
        this.state = {
            // apiVersion: "Scala & Spark Api",
            apiVersion: "Python & Scikit Learn Api",
            fileName: "",
            dataStatistics: null,
            modelTrainedResult: null,
            predictedLabel: null
        };
        this.onChangeApiVersion = this.onChangeApiVersion.bind(this);
    }

    onChangeApiVersion(e) {
        if (e.target.value === "Python & Scikit Learn Api" || this.state.apiVersion === "Python & Scikit Learn Api")
            this.setState({
                dataStatistics: null,
                modelTrainedResult: null,
                predictedLabel: null
            })

        this.setState({
            apiVersion: e.target.value,
        })
    }

    getPort() {
        return (this.state.apiVersion === "Scala & Spark Api") ? 8080 : 5000
    }

    getApiVersion() {
        let apiVersion = ""
        if (this.getPort() === 5000)
            apiVersion = (this.state.apiVersion === "Python & Spark Api") ? "/sparkApi" : "/scikitLearnApi"
        return apiVersion
    }

    async loadFile(fileName) {
        console.log(fileName)
        let port = this.getPort()
        let apiVersion = this.getApiVersion()
        let targetUrl = 'http://localhost:' + port + apiVersion + '/load?param=' + fileName
        axios.post(targetUrl, {}, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            this.setState({dataStatistics: response.data})
            this.setState({fileName: fileName})
            this.setState({modelTrainedResult: null})
        }, (error) => {
            console.log(error)
        })
    }

    async uploadFile(param) {
        console.log(param)
        let port = this.getPort()
        let apiVersion = this.getApiVersion()
        let targetUrl = 'http://localhost:' + port + apiVersion + '/upload'
        let formData = new FormData();
        formData.append("myFile", param.fileSelected);
        axios.post(targetUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then((response) => {
            this.setState({dataStatistics: response.data})
            this.setState({fileName: param.fileSelected.name})
            this.setState({modelTrainedResult: null})
        }, (error) => {
            console.log(error)
        })
    }

    async castToInt(param) {
        let port = this.getPort()
        let apiVersion = this.getApiVersion()
        let targetUrl = 'http://localhost:' + port + apiVersion + '/castToInt?param=' + param
        axios.post(targetUrl, {}, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }).then((response) => {
            this.setState({dataStatistics: response.data})
            this.setState({fileName: param.fileSelectedName})
            this.setState({modelTrainedResult: null})
        }, (error) => {
            console.log(error)
        })
    }

    async createModel(params) {
        let port = this.getPort()
        let apiVersion = this.getApiVersion()
        let targetUrl = 'http://localhost:' + port + apiVersion + '/createModel'
        axios.post(targetUrl, {
            options: params.options,
            label: params.label,
            features: params.numberFeatures.concat(params.textFeatures),
            hyperparameters: params.hyperparameters
        }, {
            headers: {
               'Content-Type': 'application/json',
            },
        }).then((response) => {
            this.setState({modelTrainedResult: response.data})
        }, (error) => {
            console.log(error)
        })
    }

    async predict(typeOfProblem, method, numberFeaturesValue,
                  textFeaturesValue, numberFeaturesNames, textFeaturesNames) {
        console.log("predict")
        let port = this.getPort()
        let apiVersion = this.getApiVersion()
        let targetUrl = 'http://localhost:' + port + apiVersion + '/predict'
        axios.post(targetUrl, {
            typeOfProblem: typeOfProblem,
            method: method,
            numberFeatures: numberFeaturesValue,
            textFeatures: textFeaturesValue,
            numberFeaturesName: numberFeaturesNames,
            textFeaturesName: textFeaturesNames
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            console.log(response.data)
            this.setState({predictedLabel: response.data})
        }, (error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <AppNavigation
                apiVersion={this.state.apiVersion}
                fileName={this.state.fileName}
                dataStatistics={this.state.dataStatistics}
                modelTrainedResult={this.state.modelTrainedResult}
                predictedLabel={this.state.predictedLabel}
                functions={{
                    actualizeApiVersion: this.onChangeApiVersion.bind(this),
                    loadFile: this.loadFile.bind(this),
                    uploadFile: this.uploadFile.bind(this),
                    createModel: this.createModel.bind(this),
                    castToInt: this.castToInt.bind(this),
                    predict: this.predict.bind(this)
                }}
            />
        );
    }
}

export default App;
