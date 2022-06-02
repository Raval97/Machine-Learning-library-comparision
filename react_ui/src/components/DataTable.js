import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RowDataTableOfNumberStats from "./RowDataTableOfNumberStats";
import RowDataTableOfTextStats from "./RowDataTableOfTextStats";

class DataTable extends Component {

    render() {
        let numberFeaturesLabel = ""
        let textFeaturesLabel = ""
        if (this.props.typeOfProblem === "Regression")
            numberFeaturesLabel = (
                <th>
                    <div onClick={() => this.props.callback.setFeaturesEmpty()}>Label</div>
                </th>
            )
        else
            textFeaturesLabel = (
                    <th className="align-middle" rowSpan="2">
                        <div onClick={() => this.props.callback.setFeaturesEmpty()}>Label</div>
                    </th>
            )
        var numberColumnStatistics = <tr/>
        var textColumnStatistics = <tr/>
        if (this.props.dataStatistics !== null) {
            let copyOfDataStatistics = {...this.props.dataStatistics};
            numberColumnStatistics = copyOfDataStatistics.numberColumnsSummary.sort((a, b) => a.name > b.name)
                .map((row, iter) => {
                    return <RowDataTableOfNumberStats key={iter} id={iter}
                                                      dataStatistics={row}
                                                      label={this.props.label}
                                                      features={this.props.numberFeatures}
                                                      typeOfProblem={this.props.typeOfProblem}
                                                      callback={this.props.callback}/>
                })

            textColumnStatistics = copyOfDataStatistics.textColumnSummary.sort((a, b) => a.name > b.name)
                .map((row, iter) => {
                    return <RowDataTableOfTextStats key={iter} id={iter}
                                                    apiVersion={this.props.apiVersion}
                                                    dataStatistics={row}
                                                    label={this.props.label}
                                                    features={this.props.textFeatures}
                                                    typeOfProblem={this.props.typeOfProblem}
                                                    callback={this.props.callback}/>
                })
        }

        let numberStatsTable = <div className="w-100 mb-2 py-1" style={{backgroundColor: "#3c941a"}}/>
        let textStatsTable = <div className="w-100 mb-2 py-1" style={{backgroundColor: "#3c941a"}}/>
        let castToNumber = ""
        if (this.props.apiVersion !== "Python & Scikit Learn Api") {
            castToNumber = (
                <th className="align-middle" rowSpan="2"
                    style={{backgroundColor: "#53b68a"}}>
                    Cast to Number
                </th>
            )
        }
        if (this.props.dataStatistics !== null && this.props.dataStatistics.numberColumnsSummary.length > 0) {
            numberStatsTable = (
                <table className="table table-striped table-light" style={{fontSize: "1vw"}}>
                    <thead style={{backgroundColor: "#9fd3bc"}}>
                    <tr>
                        {numberFeaturesLabel}
                        <th>
                            <div onClick={() => this.props.callback.setAllFeatures()}>
                                Feature
                            </div>
                        </th>
                        <th>Param</th>
                        <th>Count</th>
                        <th>Mean</th>
                        <th>StdDev</th>
                        <th>Min</th>
                        <th>25%</th>
                        <th>50%</th>
                        <th>75%</th>
                        <th>max</th>
                    </tr>
                    </thead>
                    <tbody>
                    {numberColumnStatistics}
                    </tbody>
                </table>
            )
        }
        if (this.props.dataStatistics !== null && this.props.dataStatistics.textColumnSummary.length > 0) {
            textStatsTable = (
                <table className="table table-striped table-light" style={{fontSize: "1vw"}}>
                    <thead style={{backgroundColor: "#9fd3bc"}}>
                    <tr>
                        {textFeaturesLabel}
                        <th className="align-middle" rowSpan="2">
                            <div onClick={() => this.props.callback.setAllFeatures()}>
                                Feature
                            </div>
                        </th>
                        <th className="align-middle" rowSpan="2">Param</th>
                        <th className="align-middle" rowSpan="2">Count</th>
                        <th className="align-middle" rowSpan="2">Distinct</th>
                        <th className="align-items-center justify-content-center text-center" colSpan="4"
                            style={{borderLeftStyle: "solid", borderRightStyle: "solid"}}>
                            MostCommon
                        </th>
                        {castToNumber}
                    </tr>
                    <tr>
                        <th style={{borderLeftStyle: "solid"}}>Best</th>
                        <th style={{borderRightStyle: "solid"}}>%</th>
                        <th>Second</th>
                        <th style={{borderRightStyle: "solid"}}>%</th>
                    </tr>
                    </thead>
                    <tbody>
                    {textColumnStatistics}
                    </tbody>
                </table>
            )
        }

        return (
            <div>
                <h1 className="m-2 font-weight-bold" style={{color: "#0f4885"}}>Number parameters</h1>
                {numberStatsTable}
                <h1 className="m-2 font-weight-bold pt-4" style={{color: "#0f4885"}}>Text parameters</h1>
                {textStatsTable}
            </div>
        )
    }
}

DataTable.propTypes = {
    apiVersion: PropTypes.string,
    dataStatistics: PropTypes.object,
    label: PropTypes.string,
    numberFeatures: PropTypes.arrayOf(PropTypes.string),
    textFeatures: PropTypes.arrayOf(PropTypes.string),
    typeOfProblem: PropTypes.string,
    callback: PropTypes.object
};

export default DataTable;
