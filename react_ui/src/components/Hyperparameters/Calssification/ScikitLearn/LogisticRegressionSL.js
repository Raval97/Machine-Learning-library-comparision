import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputGroupPattern from "../../../InputGroupPattern";

class LogisticRegressionSL extends Component {
    constructor() {
        super();
        this.state = {
            penalty: "l2",
            dual: false,
            tol: 1e-4,
            C: 1.0,
            fitIntercept: true,
            interceptScaling: 1,
            solver: "lbfgs",
            maxIter: 100,
            multiClass: "auto",
            verbose: 0,
            warmStart: false,
            nJobs: 1,
        };
        this.onChangePenalty = this.onChangePenalty.bind(this)
        this.onChangeDual = this.onChangeDual.bind(this)
        this.onChangeTol = this.onChangeTol.bind(this)
        this.onChangeC = this.onChangeC.bind(this)
        this.onChangeFitIntercept = this.onChangeFitIntercept.bind(this)
        this.onChangeInterceptScaling = this.onChangeInterceptScaling.bind(this)
        this.onChangeSolver = this.onChangeSolver.bind(this)
        this.onChangeMaxIter = this.onChangeMaxIter.bind(this)
        this.onChangeMultiClass = this.onChangeMultiClass.bind(this)
        this.onChangeVerbose = this.onChangeVerbose.bind(this)
        this.onChangeWarmStart = this.onChangeWarmStart.bind(this)
        this.onChangeNJobs = this.onChangeNJobs.bind(this)
    }

    async onChangePenalty(e) {
        await this.setState({
            penalty: e.target.value
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeDual(e) {
        await this.setState({
            dual: e.target.value
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeTol(e) {
        await this.setState({
           tol: parseFloat(e.target.value)
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeC(e) {
        await this.setState({
            C: parseFloat(e.target.value)
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeFitIntercept(e) {
        await this.setState({
            fitIntercept: e.target.value
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeInterceptScaling(e) {
        await this.setState({
            interceptScaling: e.target.value
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeSolver(e) {
        await this.setState({
            solver: e.target.value
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeMaxIter(e) {
        await this.setState({
            maxIter: parseInt(e.target.value)
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeMultiClass(e) {
        await this.setState({
            multiClass: e.target.value
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeVerbose(e) {
        await this.setState({
            verbose: parseFloat(e.target.value)
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeWarmStart(e) {
        await this.setState({
            warmStart: e.target.value
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeNJobs(e) {
        await this.setState({
            nJobs: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    render() {

        let penaltySelector = (
            <InputGroupPattern
                text={"Penalty"}
                infoText={"Specify the norm of the penalty:\n" +
                    "- `'none'`: no penalty is added;\n" +
                    "- `'l2'`: add a L2 penalty term and it is the default choice;\n" +
                    "- `'l1'`: add a L1 penalty term;\n" +
                    "- `'elasticnet'`: both L1 and L2 penalty terms are added."}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangePenalty} value={this.state.penalty}>
                        <option value={"none"}>None</option>
                        <option value={"l2"}>L2</option>
                        <option value={"l1"}>L1</option>
                        <option value={"elasticnet"}>Elasticnet</option>
                    </select>
                )}
                colWeight={"col-6"}
                />
        )
        let dualSelector = (
            <InputGroupPattern
                text={"Dual"}
                infoText={"Dual or primal formulation. Dual formulation is only implemented for\n" +
                    "l2 penalty with liblinear solver. Prefer dual=False when n_samples > n_features."}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeDual} value={this.state.dual}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                )}
                colWeight={"col-6"}
                />
        )
        let tolSelector = (
            <InputGroupPattern
                text={"Tol"}
                infoText={"Tolerance for stopping criteria."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.tol}
                           value={this.state.tol}
                           min={0}
                           max={1}
                           step={1e-4}
                           onChange={this.onChangeTol}/>
                )}
                colWeight={"col-6"}
                />
        )
        let CSelector = (
            <InputGroupPattern
                text={"C"}
                infoText={"Inverse of regularization strength; must be a positive float.\n" +
                    "Like in support vector machines, smaller values specify stronger regularization."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.C}
                           value={this.state.C}
                           min={0}
                           max={10}
                           step={0.1}
                           onChange={this.onChangeC}/>
                )}
                colWeight={"col-6"}
                />
        )
        let fitInterceptSelector = (
            <InputGroupPattern
                text={"Fit Intercept"}
                infoText={"Specifies if a constant (a.k.a. bias or intercept) should be added to the decision function."}
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
        let interceptScalingSelector = (
            <InputGroupPattern
                text={"Intercept Scaling"}
                infoText={"Useful only when the solver 'liblinear' is used\n" +
                    "and self.fit_intercept is set to True. In this case, x becomes\n" +
                    "[x, self.intercept_scaling],\n" +
                    "i.e. a \"synthetic\" feature with constant value equal to\n" +
                    "intercept_scaling is appended to the instance vector.\n" +
                    "The intercept becomes ``intercept_scaling * synthetic_feature_weight``."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.interceptScaling}
                           value={this.state.interceptScaling}
                           min={0}
                           max={10}
                           step={0.1}
                           onChange={this.onChangeInterceptScaling}/>
                )}
                colWeight={"col-6"}
                />
        )
        let solverSelector = (
            <InputGroupPattern
                text={"Solver"}
                infoText={" Algorithm to use in the optimization problem. Default is 'lbfgs'.\n" +
                    "o choose a solver, you might want to consider the following aspects:\n" +
                    " - For small datasets, 'liblinear' is a good choice, whereas 'sag'\n" +
                    "   and 'saga' are faster for large ones;\n" +
                    " - For multiclass problems, only 'newton-cg', 'sag', 'saga' and\n" +
                    "   'lbfgs' handle multinomial loss;\n" +
                    " - 'liblinear' is limited to one-versus-rest schemes."}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeSolver} value={this.state.solver}>
                        <option value={"newton-cg"}>newton-cg</option>
                        <option value={"lbfgs"}>lbfgs</option>
                        <option value={"liblinear"}>lib linear</option>
                        <option value={"sag"}>sag</option>
                        <option value={"saga"}>saga</option>
                    </select>
                )}
                colWeight={"col-6"}
                />
        )
        let maxIterSelector = (
            <InputGroupPattern
                text={"Max Iter"}
                infoText={"Maximum number of iterations taken for the solvers to converge."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.maxIter}
                           value={this.state.maxIter}
                           min={0}
                           max={200}
                           step={1}
                           onChange={this.onChangeMaxIter}/>
                )}
                colWeight={"col-6"}
            />
        )
        let multiClassSelector = (
            <InputGroupPattern
                text={"Multi Class"}
                infoText={""}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeMultiClass} value={this.state.multiClass}>
                        <option value={"auto"}>auto</option>
                        <option value={"ovr"}>ovr</option>
                        <option value={"multinomial"}>multinomial</option>
                    </select>
                )}
                colWeight={"col-6"}
                />
        )
        let verboseSelector = (
            <InputGroupPattern
                text={"Verbose"}
                infoText={"For the liblinear and lbfgs solvers set verbose to any positive number for verbosity."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.verbose}
                           value={this.state.verbose}
                           min={0}
                           max={32}
                           step={1}
                           onChange={this.onChangeVerbose}/>
                )}
                colWeight={"col-6"}
                />
        )
        let warmStartSelector = (
            <InputGroupPattern
                text={"Warm Start"}
                infoText={"When set to True, reuse the solution of the previous call to fit as\n" +
                    " initialization, otherwise, just erase the previous solution. Useless for liblinear solve"}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeWarmStart} value={this.state.warmStart}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                )}
                colWeight={"col-6"}
                />
        )
        let nJobsSelector = (
            <InputGroupPattern
                text={"N Jobs"}
                infoText={"The number of jobs to use for the computation. This will only provide\n" +
                    "        speedup in case of sufficiently large problems, that is if firstly\n" +
                    "        `n_targets > 1` and secondly `X` is sparse or if `positive` is set\n" +
                    "        to `True`. ``None`` means 1 unless in a\n" +
                    "        :obj:`joblib.parallel_backend` context. ``-1`` means using all\n" +
                    "        processors"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.nJobs}
                           value={this.state.nJobs}
                           min={-1}
                           max={32}
                           step={1}
                           onChange={this.onChangeNJobs}/>
                )}
                colWeight={"col-6"}
            />
        )


        return (
            <div>
                <div className="d-flex mx-auto pb-3">
                    {penaltySelector}
                    {dualSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {fitInterceptSelector}
                    {CSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {interceptScalingSelector}
                    {solverSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {maxIterSelector}
                    {multiClassSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {verboseSelector}
                    {warmStartSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {nJobsSelector}
                    {tolSelector}
                </div>
            </div>
        )
    }
}

LogisticRegressionSL.propTypes = {
    actualizeHyperparameters: PropTypes.any
};

export default LogisticRegressionSL;
