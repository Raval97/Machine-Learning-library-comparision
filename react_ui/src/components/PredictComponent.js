import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";

class PredictComponent extends Component {

    render() {
        console.log(this.props)
        let predictedLabel = <div/>
        if (this.props.predictedLabel !== null)
            predictedLabel = (
                <div style={{color: "#fff"}}>
                    <table className="table table-striped table-dark text-center" style={{fontSize: "1vw"}}>
                        <thead style={{backgroundColor: "#6e4888"}}>
                            <tr className="">
                                <td colSpan="1">label</td>
                                <th colSpan="2">{this.props.label}</th>
                            </tr>
                        </thead>
                        <tbody><tr>
                            <td colSpan="1">prediction</td>
                            <th colSpan="2">{this.props.predictedLabel}</th>
                        </tr></tbody>
                    </table>
                </div>
            )
        let numberFeaturesInputs = this.props.numberFeaturesValue.map((val, ind) => {
            let name = this.props.numberFeaturesName[ind]
            return (
                <div className="d-flex input-group mb-4 col-6"  style={{maxHeight: "30"}} key={ind}>
                    <div className="input-group-prepend">
                        <label className="input-group-text col-12">{name}</label>
                    </div>
                    <div className="input-group-append">
                        <input className="col-12" type="number"
                               placeholder={name}
                               value={val}
                               min={-10000}
                               max={10000}
                               step={0.5}
                               onChange={(e) => this.props.callback.setNumberFeaturesValue(e, ind)}/>
                    </div>
                </div>
            )
        })

        let textFeaturesInputs = this.props.textFeaturesValue.map((val, ind) => {
            let name = this.props.textFeaturesName[ind]
            return (
                <div className="d-flex input-group mb-4 col-6" style={{maxHeight: "30"}}  key={ind}>
                    <div className="input-group-prepend">
                        <label className="input-group-text col-12">{name}</label>
                    </div>
                    <div className="input-group-append">
                        <input className="col-12" type="text"
                               placeholder={name}
                               value={val}
                               onChange={(e) => this.props.callback.setTextFeaturesValue(e, ind)}/>
                    </div>
                </div>
            )
        })

        return (
            <div className="d-flex m-2 p-1">
                <div className="w-75 pt-3" style={{backgroundColor: "#586367"}}>
                    <h1 className="m-2 font-weight-bold" style={{color: "#6d9ed3"}}>Prediction Features</h1>
                    <div className="w-100 my-2 pt-1" style={{backgroundColor: "#6d9ed3"}}/>
                    <div className="d-flex flex-wrap">
                        {numberFeaturesInputs}
                        {textFeaturesInputs}
                    </div>
                </div>
                <div className="px-4 w-25">
                    <Button className="mx-auto mt-3 d-flex justify-content-center mb-3"
                            onClick={() => this.props.callback.makePredict()}>
                        Predict
                    </Button>
                    {predictedLabel}
                </div>
            </div>
        )
    }
}

PredictComponent.propTypes = {
    label: PropTypes.string,
    predictedLabel: PropTypes.any,
    numberFeaturesName: PropTypes.arrayOf(PropTypes.string),
    textFeaturesName: PropTypes.arrayOf(PropTypes.string),
    numberFeaturesValue: PropTypes.arrayOf(PropTypes.number),
    textFeaturesValue: PropTypes.arrayOf(PropTypes.string),
    callback: PropTypes.object
};

export default PredictComponent;
