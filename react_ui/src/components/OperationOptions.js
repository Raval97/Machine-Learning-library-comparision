import React, {Component} from "react";
import PropTypes from "prop-types";
import {Tooltip} from "@mui/material";

class OperationOptions extends Component {
    constructor() {
        super();
        this.state = {
            typeOfProblem: "Regression",
            method: "",
            trainSize: 0.7,
            maxCategories: 4,
            standardization: "None"
        };
        this.onChangeTypeOfProblem = this.onChangeTypeOfProblem.bind(this)
        this.onChangeMethod = this.onChangeMethod.bind(this)
        this.onChangeTrainSize = this.onChangeTrainSize.bind(this)
        this.onChangeMaxCategories = this.onChangeMaxCategories.bind(this)
        this.onChangeStandardization = this.onChangeStandardization.bind(this)
    }

    async onChangeTypeOfProblem(e) {
        await this.setState({
            typeOfProblem: e.target.value,
            method: ""
        })
        this.props.callback.actualizeOptions(this.state)
    }

    async onChangeMethod(e) {
        await this.setState({
            method: e.target.value
        })
        this.props.callback.actualizeOptions(this.state)
    }

    async onChangeTrainSize(e) {
        await this.setState({
            trainSize: parseFloat(e.target.value)
        })
        this.props.callback.actualizeOptions(this.state)
    }

    async onChangeMaxCategories(e) {
        await this.setState({
            maxCategories: parseFloat(e.target.value)
        })
        this.props.callback.actualizeOptions(this.state)
    }

    async onChangeStandardization(e) {
        await this.setState({
            standardization: e.target.value
        })
        this.props.callback.actualizeOptions(this.state)
    }

    render() {
        let regressionSelector = (
            <select className="form-control col-12" onChange={this.onChangeMethod}
                    value={this.state.regressionMethod}>
                <option value="">None selected</option>
                <option value="Linear regression">Linear regression</option>
                <option value="Generalized Linear regression">Generalized Linear regression</option>
                <option value="Decision tree regression">Decision tree regression</option>
                <option value="Random forest regression">Random forest regression</option>
            </select>
        )
        let classificationSelector = (
            <select className="form-control col-12" onChange={this.onChangeMethod}
                    value={this.state.classificationMethod}>
                <option value="">None selected</option>
                <option value="Logistic regression">Logistic regression</option>
                <option value="Decision tree classifier">Decision tree classifier</option>
                <option value="Random forest classifier">Random forest classifier</option>
                <option value="Naive Bayes">Naive Bayes</option>
            </select>
        )
        let method = (this.state.typeOfProblem === "Regression") ? regressionSelector : classificationSelector
        let methodSelector = (
            <div className="input-group d-flex col-8">
                <div className="input-group-prepend" style={{width: "20%"}}>
                    <Tooltip
                        title={"Make a standard scaler standardization"} placement="top-start">
                        <label className="input-group-text col-12 font-weight-bold">Method</label>
                    </Tooltip>
                </div>
                <div className="input-group-append">
                    {method}
                </div>
            </div>
        )
        let typeOfProblemSelector = (
            <div className="input-group d-flex justify-content-end col-4 pl-0">
                <div className="input-group-prepend">
                    <Tooltip
                        title={"Make a standard scaler standardization"} placement="top-start">
                        <label className="input-group-text col-12 font-weight-bold">Type of problem</label>
                    </Tooltip>
                </div>
                <div className="input-group-append">
                    <select className="form-control col-12" onChange={this.onChangeTypeOfProblem}
                            value={this.state.typeOfProblem}>
                        <option value="Regression">Regression</option>
                        <option value="Classification">Classification</option>
                    </select>
                </div>
            </div>
        )
        let trainTestSplit = (
            <div className="input-group d-flex justify-content-end col-4 pl-0">
                <div className="input-group-prepend">
                    <Tooltip
                        title={"Randomly splits this Dataset with the provided weights"} placement="top-start">
                        <label className="input-group-text col-12">Train Test split</label>
                    </Tooltip>
                </div>
                <div className="input-group-append">
                    <input className="col-12" type="number"
                           placeholder={this.state.trainSize}
                           value={this.state.trainSize}
                           min={0.05}
                           max={0.95}
                           step={0.05}
                           onChange={this.onChangeTrainSize}/>
                </div>
            </div>
        )
        let standardization = (
            <div className="input-group d-flex justify-content-end col-4">
                <div className="input-group-prepend">
                    <Tooltip
                        title={"Make a standard scaler standardization"} placement="top-start">
                        <label className="input-group-text col-12">Standardization</label>
                    </Tooltip>
                </div>
                <div className="input-group-append">
                    <select className="form-control col-12" onChange={this.onChangeStandardization}
                            value={this.state.standardization}>
                        <option value={"none"}>None</option>
                        <option value={"StandardScaler"}>StandardScaler</option>
                        <option value={"MinMaxScaler"}>MinMaxScaler</option>
                    </select>
                </div>
            </div>
        )
        let maxCategoriesInput = (
            <div className="input-group col-4">
                <div className="input-group-prepend">
                    <Tooltip
                        title={"Threshold for the number of values a categorical feature " +
                            "can take (>= 2). If a feature is found to have > maxCategories values, " +
                            "then it is declared continuous"} placement="top-start">
                        <label className="input-group-text col-12">Max Categories</label>
                    </Tooltip>
                </div>
                <div className="input-group-append">
                    <input className="col-10" type="number"
                           placeholder={this.state.maxCategories}
                           value={this.state.maxCategories}
                           min={2}
                           max={32}
                           step={1}
                           onChange={this.onChangeMaxCategories}/>
                </div>
            </div>
        )

        return (
            <div>
                <h1 className="m-2 font-weight-bold" style={{color: "#c4d3ec"}}>Options</h1>
                <div className="w-100 mb-2 pt-1" style={{backgroundColor: "#c4d3ec"}}/>
                <div className="d-flex mb-3">
                    {typeOfProblemSelector}
                    {methodSelector}
                </div>
                <div className="d-flex mb-2">
                    {trainTestSplit}
                    {standardization}
                    {maxCategoriesInput}
                </div>
            </div>
        )
    }
}

OperationOptions.propTypes = {
    callback: PropTypes.object
};

export default OperationOptions;
