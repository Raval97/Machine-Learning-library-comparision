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
            maxCategories: 4
        };
        this.onChangeTypeOfProblem = this.onChangeTypeOfProblem.bind(this)
        this.onChangeMethod = this.onChangeMethod.bind(this)
        this.onChangeTrainSize = this.onChangeTrainSize.bind(this)
        this.onChangeMaxCategories = this.onChangeMaxCategories.bind(this)
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

    render() {
        let regressionSelector = (
            <select className="form-control col-4 mr-2" onChange={this.onChangeMethod}
                    value={this.state.regressionMethod}>
                <option value="">None selected</option>
                <option value="Linear regression">Linear regression</option>
                <option value="Generalized Linear regression">Generalized Linear regression</option>
                <option value="Decision tree regression">Decision tree regression</option>
                <option value="Random forest regression">Random forest regression</option>
            </select>
        )
        let classificationSelector = (
            <select className="form-control col-4 mr-2" onChange={this.onChangeMethod}
                    value={this.state.classificationMethod}>
                <option value="">None selected</option>
                <option value="Logistic regression">Logistic regression</option>
                <option value="Decision tree classifier">Decision tree classifier</option>
                <option value="Random forest classifier">Random forest classifier</option>
                <option value="Naive Bayes">Naive Bayes</option>
            </select>
        )
        let methodSelector = (this.state.typeOfProblem === "Regression") ? regressionSelector : classificationSelector
        let typeOfProblemSelector = (
            <select className="form-control col-2 mr-2" onChange={this.onChangeTypeOfProblem}
                    value={this.state.typeOfProblem}>
                <option value="Regression">Regression</option>
                <option value="Classification">Classification</option>
            </select>
        )
        let maxCategoriesInput = (
            <div className="input-group mb-1 col-3">
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
        let trainTestSplit = (
            <div className="input-group mb-1 d-flex justify-content-end col-3">
                <div className="input-group-prepend">
                    <Tooltip
                        title={"Randomly splits this Dataset with the provided weights"} placement="top-start">
                        <label className="input-group-text col-12">Train Test split</label>
                    </Tooltip>
                </div>
                <div className="input-group-append">
                    <input className="col-10" type="number"
                           placeholder={this.state.trainSize}
                           value={this.state.trainSize}
                           min={0.05}
                           max={0.95}
                           step={0.05}
                           onChange={this.onChangeTrainSize}/>
                </div>
            </div>
        )

        return (
            <div>
                <h1 className="m-2 font-weight-bold" style={{color: "#c4d3ec"}}>Options</h1>
                <div className="w-100 mb-2 pt-1" style={{backgroundColor: "#c4d3ec"}}/>
                <div className="d-flex justify-content-between">
                    {typeOfProblemSelector}
                    {methodSelector}
                    {trainTestSplit}
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
