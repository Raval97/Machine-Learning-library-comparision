import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

class RowDataTableOfTextStats extends Component {

    render() {
        let name = this.props.dataStatistics.name
        let label = ""
        let castToIntButton = ""
        if (this.props.apiVersion === "Python & Scikit Learn Api") {
            castToIntButton = (
                <td className="buttonCell col-2">
                    <Button className="w-100" onClick={() => this.props.callback.castToInt(name)}/>
                </td>
            )
        }
        if (this.props.typeOfProblem === "Classification") {
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
                        onClick={() => this.props.callback.setTextFeatures(name)}
                />
            </td>
        )
        let count = this.props.dataStatistics.count
        let bestPopularPercentage = Math.round(this.props.dataStatistics.mostCommon[0].count * 10000) / 100
        let secondPopularPercentage = Math.round(this.props.dataStatistics.mostCommon[1].count * 10000) / 100
        return (
            <tr>
                {label}
                {features}
                <th className="col-2">{name}</th>
                <td className="col-1">{count}</td>
                <td className="col-1">{this.props.dataStatistics.distinct}</td>
                <td className="col-2" style={{borderLeftStyle: "solid"}}>{this.props.dataStatistics.mostCommon[0].name}</td>
                <td className="col-1" style={{borderRightStyle: "solid"}}>{bestPopularPercentage}</td>
                <td className="col-2">{this.props.dataStatistics.mostCommon[1].name}</td>
                <td className="col-1" style={{borderRightStyle: "solid"}}>{secondPopularPercentage}</td>
                {castToIntButton}
            </tr>

        )
    }
}

RowDataTableOfTextStats.propTypes = {
    id: PropTypes.number,
    apiVersion: PropTypes.string,
    dataStatistics: PropTypes.object,
    label: PropTypes.string,
    features: PropTypes.arrayOf(PropTypes.string),
    typeOfProblem: PropTypes.string,
    callback: PropTypes.object
};

export default RowDataTableOfTextStats;
