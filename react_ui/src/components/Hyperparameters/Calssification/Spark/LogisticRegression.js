import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputGroupPattern from "../../../InputGroupPattern";

class LogisticRegression extends Component {
    constructor() {
        super();
        this.state = {
            regParam: 0,
            fitIntercept: true,
            standardization: true,
            elasticNetParam: 0,
            maxIter: 100,
            tol: 1E-6,
            family: "auto",
            aggregationDepth: 2,
            threshold: 0.5
        };
        this.onChangeRegParam = this.onChangeRegParam.bind(this)
        this.onChangeFitIntercept = this.onChangeFitIntercept.bind(this)
        this.onChangeStandardization = this.onChangeStandardization.bind(this)
        this.onChangeElasticNetParam = this.onChangeElasticNetParam.bind(this)
        this.onChangeMaxIter = this.onChangeMaxIter.bind(this)
        this.onChangeTol = this.onChangeTol.bind(this)
        this.onChangeFamily = this.onChangeFamily.bind(this)
        this.onChangeAggregationDepth = this.onChangeAggregationDepth.bind(this)
        this.onChangeThreshold = this.onChangeThreshold.bind(this)
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
            maxIter: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeTol(e) {
        await this.setState({
            tol: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeFamily(e) {
        await this.setState({
            family: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeAggregationDepth(e) {
        await this.setState({
            aggregationDepth: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeThreshold(e) {
        await this.setState({
            threshold: parseFloat(e.target.value),
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
            />
        )
        let familySelector = (
            <InputGroupPattern
                text={"Family"}
                infoText={"Param for the name of family which is a description of the label distribution " +
                    "to be used in the model. Supported options:\n" +
                    "\"auto\": Automatically select the family based on the number of classes: " +
                    "If numClasses == 1 || numClasses == 2, set to \"binomial\". Else, set to \"multinomial\"\n" +
                    "\"binomial\": Binary logistic regression with pivoting.\n" +
                    "\"multinomial\": Multinomial logistic (softmax) regression without pivoting. Default is \"auto\"."}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeFamily} value={this.state.family}>
                        <option value="auto">Auto</option>
                        <option value="binomial">Binomial</option>
                        <option value="multinomial">Multinomial</option>
                    </select>
                )}
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
            />
        )
        let thresholdSelector = (
            <InputGroupPattern
                text={"Threshold"}
                infoText={"Set threshold in binary classification, in range [0, 1].\n" +
                    "If the estimated probability of class label 1 is greater than threshold, then predict 1, else 0. " +
                    "A high threshold encourages the model to predict 0 more often; " +
                    "a low threshold encourages the model to predict 1 more often.\n " +
                    "Note: Calling this with threshold p is equivalent to calling setThresholds(Array(1-p, p)). " +
                    "When setThreshold() is called, any user-set value for thresholds will be cleared. " +
                    "If both threshold and thresholds are set in a ParamMap, then they must be equivalent.\n" +
                    "Default is 0.5."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.threshold}
                           value={this.state.threshold}
                           min={0}
                           max={1}
                           step={0.05}
                           onChange={this.onChangeThreshold}/>
                )}
            />
        )

        return (
            <div>
                <div className="d-flex mx-auto pb-3">
                    {regParamSelector}
                    {fitInterceptSelector}
                    {standardizationSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {elasticNetParamSelector}
                    {maxIterSelector}
                    {tolSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {familySelector}
                    {thresholdSelector}
                    {aggregationDepthSelector}
                </div>
            </div>
        )
    }
}

LogisticRegression.propTypes = {
    actualizeHyperparameters: PropTypes.any
};

export default LogisticRegression;
