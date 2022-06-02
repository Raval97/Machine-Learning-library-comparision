import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputGroupPattern from "../../../InputGroupPattern";

class GeneralizedLinearRegression extends Component {
    constructor() {
        super();
        this.state = {
            family: "gaussian",
            variancePower: 0,
            maxIter: 25,
            regParam: 0,
            tol: 1E-6,
            solver: "irls",
            fitIntercept: true,
            aggregationDepth: 2,
        };
        this.onChangeFamily = this.onChangeFamily.bind(this)
        this.onChangeVariancePower = this.onChangeVariancePower.bind(this)
        this.onChangeMaxIter = this.onChangeMaxIter.bind(this)
        this.onChangeRegParam = this.onChangeRegParam.bind(this)
        this.onChangeTol = this.onChangeTol.bind(this)
        this.onChangeSolver = this.onChangeSolver.bind(this)
        this.onChangeFitIntercept = this.onChangeFitIntercept.bind(this)
        this.onChangeAggregationDepth = this.onChangeAggregationDepth.bind(this)
    }

    async onChangeFamily(e) {
        await this.setState({
            family: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeVariancePower(e) {
        await this.setState({
            variancePower: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeMaxIter(e) {
        await this.setState({
            maxIter: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeRegParam(e) {
        await this.setState({
            regParam: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeTol(e) {
        await this.setState({
            tol: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeSolver(e) {
        await this.setState({
            solver: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)

    }

    async onChangeFitIntercept(e) {
        await this.setState({
            fitIntercept: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeAggregationDepth(e) {
        await this.setState({
            aggregationDepth: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    render() {

        let familySelector = (
            <InputGroupPattern
                text={"Family"}
                infoText={"Param for the name of family which is a description of the error distribution to be used in the model."}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeSolver} value={this.state.family}>
                        <option value="gaussian">Gaussian</option>
                        <option value="binomial">Binomial</option>
                        <option value="poisson">Poisson</option>
                        <option value="poisson">Poisson</option>
                        <option value="gamma">Gamma</option>
                        <option value="tweedie">Tweedie</option>
                    </select>
                )}
                colWeight={"col-6"}
            />
        )
        let variancePowerSelector = (
            <InputGroupPattern
                text={"Variance Power"}
                infoText={"Sets the value of param variancePower. Used only when family is \"tweedie\". Default is 0.0, " +
                    "which corresponds to the \"gaussian\" family."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.variancePower}
                           value={this.state.variancePower}
                           min={0.00}
                           max={1}
                           step={0.05}
                           onChange={this.onChangeVariancePower}/>
                )}
                colWeight={"col-6"}
            />
        )
        let maxIterSelector = (
            <InputGroupPattern
                text={"Max Iter"}
                infoText={"Param for maximum number of iterations (>= 0)."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.maxIter}
                           value={this.state.maxIter}
                           min={0}
                           max={100}
                           step={1}
                           onChange={this.onChangeMaxIter}/>
                )}
                colWeight={"col-6"}
            />
        )
        let regParamSelector = (
            <InputGroupPattern
                text={"Reg Param"}
                infoText={"Param for regularization parameter (>= 0)."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.regParam}
                           value={this.state.regParam}
                           min={0.00}
                           max={1}
                           step={0.05}
                           onChange={this.onChangeRegParam}/>
                )}
                colWeight={"col-6"}
            />
        )
        let tolSelector = (
            <InputGroupPattern
                text={"Tol"}
                infoText={"Set the convergence tolerance of iterations. Smaller value will lead to " +
                    "higher accuracy with the cost of more iterations. Default is 1E-6."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.tol}
                           value={this.state.tol}
                           min={1E-6}
                           max={1}
                           step={0.000001}
                           onChange={this.onChangeTol}/>
                )}
                colWeight={"col-6"}
            />
        )
        let solverSelector = (
            <InputGroupPattern
                text={"Solver"}
                infoText={"Set the solver algorithm used for optimization. " +
                    "In case of linear regression, this can be \"l-bfgs\", \"normal\" and \"auto\".\n" +
                    "\"l-bfgs\" denotes Limited-memory BFGS which is a limited-memory quasi-Newton optimization method.\n" +
                    "\"normal\" denotes using Normal Equation as an analytical solution to the linear regression problem. " +
                    "This solver is limited to LinearRegression.MAX_FEATURES_FOR_NORMAL_SOLVER.\n" +
                    "\"auto\" (default) means that the solver algorithm is selected automatically. " +
                    "The Normal Equations solver will be used when possible, but this will automatically fall back to " +
                    "iterative optimization methods when needed.\n" +
                    "Note: Fitting with huber loss doesn't support normal solver, " +
                    "so throws exception if this param was set with \"normal\"."}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeSolver} value={this.state.solver}>
                        <option value="auto">Auto</option>
                        <option value="normal">Normal</option>
                        <option value="l-bfgs">LBFGS</option>
                    </select>
                )}
                colWeight={"col-6"}
            />
        )
        let fitInterceptSelector = (
            <InputGroupPattern
                text={"Fit Intercept"}
                infoText={"Param for whether to fit an intercept term."}
                input={(
                    <select className="custom-select col-10"
                            onChange={this.onChangeFitIntercept} value={this.state.fitIntercept}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                )}
                colWeight={"col-6"}
            />
        )
        let aggregationDepthSelector = (
            <InputGroupPattern
                text={"Aggregation Depth"}
                infoText={"Suggested depth for treeAggregate (greater than or equal to 2). " +
                    "If the dimensions of features or the number of partitions are large, " +
                    "this param could be adjusted to a larger size. Default is 2"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.aggregationDepth}
                           value={this.state.aggregationDepth}
                           min={1}
                           max={20}
                           step={1}
                           onChange={this.onChangeAggregationDepth}/>
                )}
                colWeight={"col-6"}
            />
        )

        return (
            <div>
                <div className="d-flex mx-auto pb-3">
                    {familySelector}
                    {variancePowerSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {maxIterSelector}
                    {regParamSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {tolSelector}
                    {solverSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {fitInterceptSelector}
                    {aggregationDepthSelector}
                </div>
            </div>
        )
    }
}

GeneralizedLinearRegression.propTypes = {
    actualizeHyperparameters: PropTypes.any
};

export default GeneralizedLinearRegression;
