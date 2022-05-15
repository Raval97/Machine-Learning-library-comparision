import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";
import DataTable from "../components/DataTable";
import FileSelection from "../components/FileSelection";
import OperationOptions from "../components/OperationOptions";
import Summary from "../components/Summary";
import ApiVersion from "../components/ApiVersion";
import OperationHyperparameters from "../components/Hyperparameters/OperationHyperparameters";
import PredictComponent from "../components/PredictComponent";

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            options: {
                typeOfProblem: "Regression",
                method: "",
                trainSize: 0.7,
                maxCategories: 4
            },
            label: "",
            numberFeatures: [],
            textFeatures: [],
            numberFeaturesName: [],
            textFeaturesName: [],
            numberFeaturesValue: [],
            textFeaturesValue: [],
            hyperparameters: {
                linearRegressionModel: null,
                generalizedLinearRegressionModel: null,
                decisionTreeRegModel: null,
                randomForrestRegModel: null,
                logisticRegressionModel: null,
                naiveBayesModel: null,
                decisionTreeClassModel: null,
                randomForrestClassModel: null
            }
        };
        this.onChangeOptions = this.onChangeOptions.bind(this);
        this.onChangeLabel = this.onChangeLabel.bind(this);
        this.onChangeNumberFeatures = this.onChangeNumberFeatures.bind(this);
        this.onChangeTextFeatures = this.onChangeTextFeatures.bind(this);
        this.onChangeNumberFeaturesValue = this.onChangeNumberFeaturesValue.bind(this);
        this.onChangeTextFeaturesValue = this.onChangeTextFeaturesValue.bind(this);
        this.onChangeHyperparameters = this.onChangeHyperparameters.bind(this);
    }

    onChangeOptions(operationOptions) {
        let label = (this.state.options.typeOfProblem !== operationOptions.typeOfProblem) ? "" : this.state.label
        this.setState({
            options: operationOptions,
            label: label,
        })
        console.log(this.state.options)
    }

    onChangeHyperparameters(operationHyperparameters) {
        this.setState({
            hyperparameters: operationHyperparameters
        })
        console.log(this.state.hyperparameters)
    }

    onChangeLabel(param) {
        if (this.state.label === param) {
            this.setState({
                label: "none selected"
            })
        } else {
            this.setState({
                label: param
            })
        }
    }

    onChangeNumberFeatures(param) {
        let newState = this.state.numberFeatures
        let index = newState.findIndex((value) => value === param)
        if (index !== -1) {
            newState.splice(index, 1)
            this.setState({
                numberFeatures: newState
            })
        } else {
            newState.push(param)
            this.setState({
                numberFeatures: newState
            })
        }
    }

    onChangeTextFeatures(param) {
        let newState = this.state.textFeatures
        let index = newState.findIndex((value) => value === param)
        if (index !== -1) {
            newState.splice(index, 1)
            this.setState({
                textFeatures: newState
            })
        } else {
            newState.push(param)
            this.setState({
                textFeatures: newState
            })
        }
    }

    onChangeNumberFeaturesValue(e, index) {
        let numberFeaturesCopy = [...this.state.numberFeaturesValue]
        numberFeaturesCopy[index] = parseFloat(e.target.value)
        this.setState({
            numberFeaturesValue: numberFeaturesCopy
        })
    }

    onChangeTextFeaturesValue(e, index) {
        let textFeaturesCopy = [...this.state.textFeaturesValue]
        textFeaturesCopy[index] = e.target.value
        this.setState({
            textFeaturesValue: textFeaturesCopy
        })
    }

    async changeApiVersion(e) {
        if (e.target.value === "Python & Scikit Learn Api" || this.props.apiVersion === "Python & Scikit Learn Api")
            this.restartState()
        await this.props.functions.actualizeApiVersion(e)
    }

    restartState() {
        let optionsCopy = {...this.state.options}
        this.setState({
            options: optionsCopy,
            label: "",
            numberFeatures: [],
            textFeatures: [],
            numberFeaturesName: [],
            textFeaturesName: [],
            numberFeaturesValue: [],
            textFeaturesValue: [],
            hyperparameters: {
                linearRegressionModel: null,
                generalizedLinearRegressionModel: null,
                decisionTreeRegModel: null,
                randomForrestRegModel: null,
                logisticRegressionModel: null,
                naiveBayesModel: null,
                decisionTreeClassModel: null,
                randomForrestClassModel: null
            }
        })
    }

    loadFile(params) {
        this.restartState()
        this.props.functions.loadFile(params)
    }

    uploadFile(params) {
        this.restartState()
        this.props.functions.uploadFile(params)
    }

    async createModel() {
        let textFeaturesCopy = [...this.state.textFeatures]
        let numberFeaturesCopy = [...this.state.numberFeatures]
        this.setState({
            textFeaturesName: textFeaturesCopy
        })
        this.setState({
            numberFeaturesName: numberFeaturesCopy
        })
        this.setState({
            textFeaturesValue: textFeaturesCopy.map(() => "")
        })
        this.setState({
            numberFeaturesValue: numberFeaturesCopy.map(() => 1)
        })
        await this.props.functions.createModel(this.state)
    }

    async makePredict() {
        console.log("makePredict")
        await this.props.functions.predict(
            this.state.options.typeOfProblem,
            this.state.options.method,
            this.state.numberFeaturesValue,
            this.state.textFeaturesValue,
            this.state.numberFeaturesName,
            this.state.textFeaturesName
        )
    }

    render() {
        let optionsPanel = <div/>
        let hyperparametersPanel = <div/>
        let modelTrainedPanel = <div/>
        let predictionPanel = <div/>
        let dataStatisticsPanel = <div/>
        if (this.props.fileName !== "")
            optionsPanel = (
                <OperationOptions callback={{
                    actualizeOptions: this.onChangeOptions.bind(this)
                }}/>
            )
        if (this.state.options.method !== "" && this.state.label !== "none selected" && this.props.dataStatistics !== null)
            hyperparametersPanel = (
                <OperationHyperparameters
                    apiVersion={this.props.apiVersion}
                    method={this.state.options.method}
                    actualizeHyperparameters={this.onChangeHyperparameters.bind(this)}
                />
            )
        if ((this.state.numberFeatures.length > 0 || this.state.textFeatures.length > 0) &&
            this.state.options.method !== "" && this.state.label !== "")
            modelTrainedPanel = (
                <div>
                    <Button className="mx-auto mt-3 d-flex justify-content-center"
                            onClick={() => this.createModel()}>Create Model
                    </Button>
                    <Summary modelTrainedResult={this.props.modelTrainedResult}/>
                </div>
            )
        if (this.props.modelTrainedResult !== null)
            predictionPanel = (
                <PredictComponent
                    label={this.state.label}
                    predictedLabel={this.props.predictedLabel}
                    numberFeaturesName={this.state.numberFeaturesName}
                    textFeaturesName={this.state.textFeaturesName}
                    numberFeaturesValue={this.state.numberFeaturesValue}
                    textFeaturesValue={this.state.textFeaturesValue}
                    callback={{
                        setTextFeaturesValue: this.onChangeTextFeaturesValue.bind(this),
                        setNumberFeaturesValue: this.onChangeNumberFeaturesValue.bind(this),
                        makePredict: this.makePredict.bind(this)
                    }}
                />
            )
        if (this.props.dataStatistics !== null)
            dataStatisticsPanel = (
                <DataTable dataStatistics={this.props.dataStatistics}
                           label={this.state.label}
                           numberFeatures={this.state.numberFeatures}
                           textFeatures={this.state.textFeatures}
                           typeOfProblem={this.state.options.typeOfProblem}
                           callback={{
                               apiVersion: this.props.apiVersion,
                               setLabel: this.onChangeLabel.bind(this),
                               setNumberFeatures: this.onChangeNumberFeatures.bind(this),
                               setTextFeatures: this.onChangeTextFeatures.bind(this),
                               castToInt: this.props.functions.castToInt
                           }}
                />
            )

        return (
            <div className="mx-auto w-75 my-2 p-1" style={{backgroundColor: "#cbbebe"}}>
                <div className="d-flex justify-content-center mb-2 py-2">
                    <ApiVersion
                        apiVersion={this.props.apiVersion}
                        actualizeApiVersion={this.changeApiVersion.bind(this)}
                    />
                </div>
                <div className="mx-3 mb-3 p-3" style={{backgroundColor: "#af7373"}}>
                    <FileSelection
                        apiVersion={this.props.apiVersion}
                        fileName={this.props.fileName}
                        loadFile={this.loadFile.bind(this)}
                        uploadFile={this.uploadFile.bind(this)}
                    />
                </div>
                <div className="mx-2 mb-3 p-2" style={{backgroundColor: "#586367"}}>
                    {optionsPanel}
                </div>
                <div className="d-flex mx-2 mb-3 p-2" style={{backgroundColor: "#882457"}}>
                    <div className="w-75" style={{backgroundColor: "#586367"}} >
                        {hyperparametersPanel}
                    </div>
                    <div className="w-25 px-3">
                        {modelTrainedPanel}
                    </div>
                </div>
                <div className="mx-2 mb-3 p-2" style={{backgroundColor: "#b01333"}}>
                    {predictionPanel}
                </div>
                <div className=" mx-2 mb-3 p-2" style={{backgroundColor: "#52b0d9"}}>
                    {dataStatisticsPanel}
                </div>
            </div>
        )
    }
}

HomePage.propTypes = {
    apiVersion: PropTypes.string,
    fileName: PropTypes.string,
    dataStatistics: PropTypes.object,
    modelTrainedResult: PropTypes.object,
    predictedLabel: PropTypes.any,
    functions: PropTypes.object
};

export default HomePage;
