import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

class RowDataTableOfNumberStats extends Component {

    render() {
        let name = this.props.dataStatistics.name
        let label = ""
        if (this.props.typeOfProblem === "Regression") {
            label = (
                <td className="buttonCell col-1">
                    <Button className="w-100"
                            style={this.props.label === name ?
                                {backgroundColor: "#8fcb2d"} : {backgroundColor: "#ffffff"}}
                            onClick={() => this.props.callback.setLabel(name)}
                    />
                </td>
            )
        }
        let features = (
            <td className="buttonCell col-1">
                <Button className="w-100"
                        style={this.props.features.findIndex((value) => value === name) !== -1 ?
                            {backgroundColor: "#305eb4"} : {backgroundColor: "#ffffff"}}
                        onClick={() => this.props.callback.setNumberFeatures(name)}
                />
            </td>
        )
        return (

            <tr>
                {label}
                {features}
                <th className="col-3">{name}</th>
                <td>{this.props.dataStatistics.count}</td>
                <td>{Math.round(this.props.dataStatistics.mean * 1000) / 1000}</td>
                <td>{Math.round(this.props.dataStatistics.stdDev * 1000) / 1000}</td>
                <td>{this.props.dataStatistics.min}</td>
                <td>{this.props.dataStatistics.percentage25}</td>
                <td>{this.props.dataStatistics.percentage50}</td>
                <td>{this.props.dataStatistics.percentage75}</td>
                <td>{this.props.dataStatistics.max}</td>
            </tr>

        )
    }
}

RowDataTableOfNumberStats.propTypes = {
    id: PropTypes.number,
    dataStatistics: PropTypes.object,
    label: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    typeOfProblem: PropTypes.string,
    callback: PropTypes.object
};

export default RowDataTableOfNumberStats;
