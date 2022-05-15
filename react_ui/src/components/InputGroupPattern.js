import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tooltip from "@mui/material/Tooltip";

class InputGroupPattern extends Component {

    render() {
        let labelWeight = this.props.labelWeight === undefined ? 50 : this.props.labelWeight
        let infoText = this.props.infoText === undefined ? "" : this.props.infoText
        let labelWeightPercent = labelWeight + "%"
        let inputWeight = 100 - labelWeight
        let inputWeightPercent = inputWeight + "%"
        let colCount = this.props.colWeight === undefined ? "col-4" : this.props.colWeight
        let classname = "d-flex input-group mb-1 " + colCount
        return (
            <div className={classname}>
                <div className="input-group-prepend"  style={{width: labelWeightPercent}}>
                    <Tooltip title={infoText} placement="top-start">
                        <label className="input-group-text col-12">{this.props.text}</label>
                    </Tooltip>
                </div>
                <div className="input-group-append" style={{width: inputWeightPercent}}>
                    {this.props.input}
                </div>
            </div>
        )
    }
}

InputGroupPattern.propTypes = {
    text: PropTypes.string,
    infoText: PropTypes.string,
    labelWeight: PropTypes.number,
    colWeight: PropTypes.string,
    input: PropTypes.any
};

export default InputGroupPattern;
