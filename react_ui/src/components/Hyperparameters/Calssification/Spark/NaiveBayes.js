import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputGroupPattern from "../../../InputGroupPattern";

class NaiveBayes extends Component {
    constructor() {
        super();
        this.state = {
            smoothing: 1,
            modelType: "multinomial"
        };
        this.onChangeSmoothing = this.onChangeSmoothing.bind(this)
        this.onChangeModelType = this.onChangeModelType.bind(this)
    }

    async onChangeSmoothing(e) {
        await this.setState({
            smoothing: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeModelType(e) {
        await this.setState({
            modelType: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    render() {

        let smoothingSelector = (
            <InputGroupPattern
                text={"Smoothing"}
                infoText={"Set the smoothing parameter. Default is 1.0"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.smoothing}
                           value={this.state.smoothing}
                           min={0}
                           max={1}
                           step={0.05}
                           onChange={this.onChangeSmoothing}/>
                )}
            />
        )
        let modelTypeSelector = (
            <InputGroupPattern
                text={"Model Type"}
                infoText={"Set the model type using a string (case-sensitive)."}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeModelType} value={this.state.modelType}>
                        <option value="multinomial">Multinomial</option>
                        <option value="bernoulli">Bernoulli</option>
                        <option value="gaussian">Gaussian</option>
                        <option value="complement">Complement</option>
                    </select>
                )}
                labelWeight={40}
            />
        )

        return (
            <div>
                <div className="d-flex mx-auto pb-3">
                    {smoothingSelector}
                    {modelTypeSelector}
                </div>
            </div>
        )
    }
}

NaiveBayes.propTypes = {
    actualizeHyperparameters: PropTypes.any
};

export default NaiveBayes;
