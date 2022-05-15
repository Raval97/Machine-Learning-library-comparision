import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputGroupPattern from "../../../InputGroupPattern";

class LinearRegressionSL extends Component {
    constructor() {
        super();
        this.state = {
            fitIntercept: true,
            copyX: true,
            nJobs: 1,
            positive: true
        };
        this.onChangeFitIntercept = this.onChangeFitIntercept.bind(this)
        this.onChangeCopyX = this.onChangeCopyX.bind(this)
        this.onChangeNJobs = this.onChangeNJobs.bind(this)
        this.onChangePositive = this.onChangePositive.bind(this)
    }

    async onChangeFitIntercept(e) {
        await this.setState({
            fitIntercept: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeCopyX(e) {
        await this.setState({
            copyX: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeNJobs(e) {
        await this.setState({
            nJobs: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangePositive(e) {
        await this.setState({
            positive: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    render() {

        let fitInterceptSelector = (
            <InputGroupPattern
                text={"Fit Intercept"}
                infoText={"Whether to calculate the intercept for this model. If set to False, " +
                    "no intercept will be used in calculations (i.e. data is expected to be centered)."}
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
        let copyXSelector = (
            <InputGroupPattern
                text={"Copy X"}
                infoText={"If True, X will be copied; else, it may be overwritten"}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeCopyX} value={this.state.copyX}>
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
        let positiveSelector = (
            <InputGroupPattern
                text={"Positive"}
                infoText={"When set to ``True``, forces the coefficients to be positive. This\n" +
                    "        option is only supported for dense arrays."}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangePositive} value={this.state.positive}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                )}
                colWeight={"col-6"}
            />
        )

        return (
            <div>
                <div className="d-flex mx-auto pb-3">
                    {fitInterceptSelector}
                    {copyXSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {nJobsSelector}
                    {positiveSelector}
                </div>
            </div>
        )
    }
}

LinearRegressionSL.propTypes = {
    actualizeHyperparameters: PropTypes.any
};

export default LinearRegressionSL;
