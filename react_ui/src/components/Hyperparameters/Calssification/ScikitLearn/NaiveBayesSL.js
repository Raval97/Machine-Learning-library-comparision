import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputGroupPattern from "../../../InputGroupPattern";

class NaiveBayesSL extends Component {
    constructor() {
        super();
        this.state = {
            varSmoothing: 1e-9,
        };
        this.onChangeVarSmoothing = this.onChangeVarSmoothing.bind(this)
    }

    async onChangeVarSmoothing(e) {
        await this.setState({
            varSmoothing: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    render() {

        let varSmoothingSelector = (
            <InputGroupPattern
                text={"Var Smoothing"}
                infoText={"Portion of the largest variance of all features that is added to variances for calculation stability"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.varSmoothing}
                           value={this.state.varSmoothing}
                           min={0}
                           max={1}
                           step={1e-9}
                           onChange={this.onChangeVarSmoothing}/>
                )}
                colWeight={"col-6"}
            />
        )

        return (
            <div>
                <div className="d-flex mx-auto pb-3">
                    {varSmoothingSelector}
                </div>
            </div>
        )
    }
}

NaiveBayesSL.propTypes = {
    actualizeHyperparameters: PropTypes.any
};

export default NaiveBayesSL;
