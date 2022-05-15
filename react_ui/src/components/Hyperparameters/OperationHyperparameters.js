import React, {Component} from "react";
import PropTypes from "prop-types";
import LinearRegression from "./Regression/Spark/LinearRegression";
import GeneralizedLinearRegression from "./Regression/Spark/GeneralizedLinearRegression";
import DecisionTreeReg from "./Regression/Spark/DecisionTreeReg";
import RandomForrestReg from "./Regression/Spark/RandomForrestReg";
import RandomForrestClass from "./Calssification/Spark/RandomForrestClass";
import DecisionTreeClass from "./Calssification/Spark/DecisionTreeClass";
import LogisticRegression from "./Calssification/Spark/LogisticRegression";
import NaiveBayes from "./Calssification/Spark/NaiveBayes";
import LinearRegressionSL from "./Regression/ScikitLearn/LinearRegressionSL";
import LogisticRegressionSL from "./Calssification/ScikitLearn/LogisticRegressionSL";
import RandomForrestClassSL from "./Calssification/ScikitLearn/RandomForrestClassSL";
import RandomForrestRegSL from "./Regression/ScikitLearn/RandomForrestRegSL";
import DecisionTreeRegSL from "./Regression/ScikitLearn/DecisionTreeRegSL";
import DecisionTreeClassSL from "./Calssification/ScikitLearn/DecisionTreeClassSL";
import NaiveBayesSL from "./Calssification/ScikitLearn/NaiveBayesSL";

class OperationHyperparameters extends Component {
    constructor() {
        super();
        this.state = {
            linearRegressionModel: null,
            generalizedLinearRegressionModel: null,
            decisionTreeRegModel: null,
            randomForrestRegModel: null,
            logisticRegressionModel: null,
            naiveBayesModel: null,
            decisionTreeClassModel: null,
            randomForrestClassModel: null
        };
        this.onChangeLinearRegressionMode = this.onChangeLinearRegressionMode.bind(this);
        this.onChangeGeneralizedLinearRegression = this.onChangeGeneralizedLinearRegression.bind(this);
        this.onChangeDecisionTreeRegModel = this.onChangeDecisionTreeRegModel.bind(this)
        this.onChangeRandomForrestRegModel = this.onChangeRandomForrestRegModel.bind(this)
        this.onChangeLogisticRegressionModel = this.onChangeLogisticRegressionModel.bind(this)
        this.onChangeNaiveBayesModel = this.onChangeNaiveBayesModel.bind(this)
        this.onChangeDecisionTreeClassModel = this.onChangeDecisionTreeClassModel.bind(this)
        this.onChangeRandomForrestClassModel = this.onChangeRandomForrestClassModel.bind(this)

    }

    onChangeLinearRegressionMode(parameters) {
        this.setState({
            linearRegressionModel: parameters
        })
        this.props.actualizeHyperparameters(this.state)
        console.log(this.state.linearRegressionModel)
    }

    onChangeGeneralizedLinearRegression(parameters) {
        this.setState({
            generalizedLinearRegressionModel: parameters
        })
        this.props.actualizeHyperparameters(this.state)
        console.log(this.state.generalizedLinearRegressionModel)
    }

    onChangeDecisionTreeRegModel(parameters) {
        this.setState({
            decisionTreeRegModel: parameters
        })
        this.props.actualizeHyperparameters(this.state)
        console.log(this.state.decisionTreeRegModel)
    }

    onChangeRandomForrestRegModel(parameters) {
        this.setState({
            randomForrestRegModel: parameters
        })
        this.props.actualizeHyperparameters(this.state)
        console.log(this.state.randomForrestRegModel)
    }

    onChangeLogisticRegressionModel(parameters) {
        this.setState({
            logisticRegressionModel: parameters
        })
        this.props.actualizeHyperparameters(this.state)
        console.log(this.state.logisticRegressionModel)
    }

    onChangeNaiveBayesModel(parameters) {
        this.setState({
            naiveBayesModel: parameters
        })
        this.props.actualizeHyperparameters(this.state)
        console.log(this.state.naiveBayesModel)
    }

    onChangeDecisionTreeClassModel(parameters) {
        this.setState({
            decisionTreeClassModel: parameters
        })
        this.props.actualizeHyperparameters(this.state)
        console.log(this.state.decisionTreeClassModel)
    }

    onChangeRandomForrestClassModel(parameters) {
        this.setState({
            randomForrestClassModel: parameters
        })
        this.props.actualizeHyperparameters(this.state)
        console.log(this.state.randomForrestClassModel)
    }

    getHyperParams() {
        if (this.props.apiVersion === "Python & Scikit Learn Api") {
            switch (this.props.method) {
                case 'Linear regression':
                    return <LinearRegressionSL
                        actualizeHyperparameters={this.onChangeLinearRegressionMode.bind(this)}/>
                case 'Decision tree regression':
                    return <DecisionTreeRegSL
                        actualizeHyperparameters={this.onChangeDecisionTreeRegModel.bind(this)}/>
                case 'Random forest regression':
                    return <RandomForrestRegSL
                        actualizeHyperparameters={this.onChangeRandomForrestRegModel.bind(this)}/>
                case 'Logistic regression':
                    return <LogisticRegressionSL
                        actualizeHyperparameters={this.onChangeLogisticRegressionModel.bind(this)}/>
                case 'Decision tree classifier':
                    return <DecisionTreeClassSL
                        actualizeHyperparameters={this.onChangeDecisionTreeClassModel.bind(this)}/>
                case 'Random forest classifier':
                    return <RandomForrestClassSL
                        actualizeHyperparameters={this.onChangeRandomForrestClassModel.bind(this)}/>
                case 'Naive Bayes':
                    return <NaiveBayesSL actualizeHyperparameters={this.onChangeNaiveBayesModel.bind(this)}/>
                default:
                    return <div/>
            }
        } else {
            switch (this.props.method) {
                case 'Linear regression':
                    return <LinearRegression
                        actualizeHyperparameters={this.onChangeLinearRegressionMode.bind(this)}/>
                case 'Generalized Linear regression':
                    return <GeneralizedLinearRegression
                        actualizeHyperparameters={this.onChangeGeneralizedLinearRegression.bind(this)}/>
                case 'Decision tree regression':
                    return <DecisionTreeReg
                        actualizeHyperparameters={this.onChangeDecisionTreeRegModel.bind(this)}/>
                case 'Random forest regression':
                    return <RandomForrestReg
                        actualizeHyperparameters={this.onChangeRandomForrestRegModel.bind(this)}/>
                case 'Logistic regression':
                    return <LogisticRegression
                        actualizeHyperparameters={this.onChangeLogisticRegressionModel.bind(this)}/>
                case 'Decision tree classifier':
                    return <DecisionTreeClass
                        actualizeHyperparameters={this.onChangeDecisionTreeClassModel.bind(this)}/>
                case 'Random forest classifier':
                    return <RandomForrestClass
                        actualizeHyperparameters={this.onChangeRandomForrestClassModel.bind(this)}/>
                case 'Naive Bayes':
                    return <NaiveBayes actualizeHyperparameters={this.onChangeNaiveBayesModel.bind(this)}/>
                default:
                    return (
                        <div>
                            {/*<p>1. Select Api Version</p>*/}
                            {/*<p>2. Choose a file</p>*/}
                            {/*<p>3. Choose a type of problem between regression & classification</p>*/}
                            {/*<p>4. Select method of regression or classification</p>*/}
                            {/*<p>5. Define other options or use default</p>*/}
                            {/*<p>6. Define hyperparameters for specific method or use default</p>*/}
                            {/*<p>7. Select label for model of machine learning method (only one)</p>*/}
                            {/*<p>8. Select features for model of machine learning method</p>*/}
                            {/*<p>9. Create model & check a result</p>*/}
                            {/*<p>10. Predict your own new data on trained model</p>*/}
                        </div>
                    )
            }
        }
    }

    render() {
        let hyperParams = this.getHyperParams()
        return (
            <div className="m-2">
                <h1 className="font-weight-bold" style={{color: "#6d9ed3"}}>Hyperparameters</h1>
                <div className="w-100 mb-2 pt-1" style={{backgroundColor: "#6d9ed3"}}/>
                {hyperParams}
            </div>
        )
    }
}

OperationHyperparameters
    .propTypes = {
    apiVersion: PropTypes.string,
    method: PropTypes.string,
    actualizeHyperparameters: PropTypes.any
};

export default OperationHyperparameters;
