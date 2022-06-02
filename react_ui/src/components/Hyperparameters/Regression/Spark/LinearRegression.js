import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputGroupPattern from "../../../InputGroupPattern";

class LinearRegression extends Component {
    constructor() {
        super();
        this.state = {
            regParam: 0,
            fitIntercept: true,
            standardization: true,
            elasticNetParam: 0,
            maxIter: 100,
            tol: 1E-6,
            solver: "auto",
            aggregationDepth: 2,
            loss: "squaredError",
            epsilon: 1.35
        };
        this.onChangeRegParam = this.onChangeRegParam.bind(this)
        this.onChangeFitIntercept = this.onChangeFitIntercept.bind(this)
        this.onChangeStandardization = this.onChangeStandardization.bind(this)
        this.onChangeElasticNetParam = this.onChangeElasticNetParam.bind(this)
        this.onChangeMaxIter = this.onChangeMaxIter.bind(this)
        this.onChangeTol = this.onChangeTol.bind(this)
        this.onChangeSolver = this.onChangeSolver.bind(this)
        this.onChangeAggregationDepth = this.onChangeAggregationDepth.bind(this)
        this.onChangeLoss = this.onChangeLoss.bind(this)
        this.onChangeEpsilon = this.onChangeEpsilon.bind(this)
    }

    async onChangeRegParam(e) {
        await this.setState({
            regParam: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeFitIntercept(e) {
        await this.setState({
            fitIntercept: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeStandardization(e) {
        await this.setState({
            standardization: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeElasticNetParam(e) {
        await this.setState({
            elasticNetParam: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeMaxIter(e) {
        await this.setState({
            maxIter: parseInt(e.target.value),
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

    async onChangeAggregationDepth(e) {
        await this.setState({
            aggregationDepth: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeLoss(e) {
        await this.setState({
            loss: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeEpsilon(e) {
        await this.setState({
            epsilon: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    render() {

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
        let standardizationSelector = (
            <InputGroupPattern
                text={"Standardization"}
                infoText={"Whether to standardize the training features before fitting the model. The coefficients of " +
                    "models will be always returned on the original scale, so it will be transparent for users. " +
                    "Default is true.\n Note: \n With/without standardization, the models should be always converged " +
                    "to the same solution when no regularization is applied. In R's GLMNET package, " +
                    "the default behavior is true as well."}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeStandardization} value={this.state.standardization}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                )}
                colWeight={"col-6"}
            />
        )
        let elasticNetParamSelector = (
            <InputGroupPattern
                text={"Elastic Net Param"}
                infoText={"Set the ElasticNet mixing parameter. For alpha = 0, the penalty is an L2 penalty. " +
                    "For alpha = 1, it is an L1 penalty. For alpha in (0,1), the penalty is a combination of L1 and L2. " +
                    "Default is 0.0 which is an L2 penalty.\n Note: Fitting with huber loss only supports None " +
                    "and L2 regularization, so throws exception if this param is non-zero value."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.elasticNetParam}
                           value={this.state.elasticNetParam}
                           min={0.00}
                           max={1}
                           step={0.05}
                           onChange={this.onChangeElasticNetParam}/>
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
        let lossSelector = (
            <InputGroupPattern
                text={"Loss"}
                infoText={"Sets the value of param loss. The loss function to be optimized"}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeLoss} value={this.state.loss}>
                        <option value="squaredError">Squared Error</option>
                        <option value="huber">Huber</option>
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
        let epsilonSelector = (
            <InputGroupPattern
                text={"Epsilon"}
                infoText={"Sets the value of param epsilon. Default is 1.35."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.epsilon}
                           value={this.state.epsilon}
                           min={1}
                           max={2}
                           step={0.05}
                           onChange={this.onChangeEpsilon}/>
                )}
                colWeight={"col-6"}
            />
        )

        return (
            <div>
                <div className="d-flex mx-auto pb-3">
                    {regParamSelector}
                    {fitInterceptSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {standardizationSelector}
                    {elasticNetParamSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {maxIterSelector}
                    {tolSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {solverSelector}
                    {lossSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {aggregationDepthSelector}
                    {epsilonSelector}
                </div>
            </div>
        )
    }
}

LinearRegression.propTypes = {
    actualizeHyperparameters: PropTypes.any
};

export default LinearRegression;
