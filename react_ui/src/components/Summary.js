import React, {Component} from "react";
import PropTypes from "prop-types";

class Summary extends Component {

    render() {
        let result = null
        if (this.props.modelTrainedResult !== null) {
            let metrics = <div/>
            if (this.props.modelTrainedResult.regressionMetrics !== undefined &&
                this.props.modelTrainedResult.regressionMetrics !== null) {
                let regMetrics = this.props.modelTrainedResult.regressionMetrics
                metrics = (
                    <tbody>
                    <tr>
                        <td>R^2</td>
                        <td>{Math.round(regMetrics.r2 * 1000) / 1000}</td>
                    </tr>
                    <tr>
                        <td>RMSE</td>
                        <td>{Math.round(regMetrics.rmse * 1000) / 1000}</td>
                    </tr>
                    <tr style={{color: "#6ec923"}}>
                        <td>Time<br/>(prepare data)</td>
                        <td>{Math.round(this.props.modelTrainedResult.prepareDataTime * 1000) / 1000}</td>
                    </tr>
                    <tr style={{color: "#6ec923"}}>
                        <td>Time<br/>(model training)</td>
                        <td>{Math.round(this.props.modelTrainedResult.trainingModelTime * 1000) / 1000}</td>
                    </tr>
                    <tr style={{color: "#6ec923"}}>
                        <td>Time<br/>(compute metrics)</td>
                        <td>{Math.round(this.props.modelTrainedResult.calculateMetricsTime * 1000) / 1000}</td>
                    </tr>
                    </tbody>
                )
            }
            if (this.props.modelTrainedResult.classificationMetrics !== undefined &&
                this.props.modelTrainedResult.classificationMetrics !== null) {
                let classMetrics = this.props.modelTrainedResult.classificationMetrics
                metrics = (
                    <tbody>
                    <tr>
                        <td>Accuracy</td>
                        <td>{Math.round(classMetrics.accuracy * 1000) / 1000}</td>
                    </tr>
                    <tr>
                        <td>Error</td>
                        <td>{Math.round(classMetrics.error * 1000) / 1000}</td>
                    </tr>
                    <tr>
                        <td>Precision</td>
                        <td>{Math.round(classMetrics.precision * 1000) / 1000}</td>
                    </tr>
                    <tr>
                        <td>F1</td>
                        <td>{Math.round(classMetrics.f1 * 1000) / 1000}</td>
                    </tr>
                    <tr>
                        <td>Recall</td>
                        <td>{Math.round(classMetrics.weightedRecall * 1000) / 1000}</td>
                    </tr>
                    <tr>
                        <td>Hamming Loss</td>
                        <td>{Math.round(classMetrics.hammingLoss * 1000) / 1000}</td>
                    </tr>
                    <tr style={{color: "#6ec923"}}>
                        <td>Time<br/>(prepare data)</td>
                        <td>{Math.round(this.props.modelTrainedResult.prepareDataTime * 1000) / 1000}</td>
                    </tr>
                    <tr style={{color: "#6ec923"}}>
                        <td>Time<br/> (model training)</td>
                        <td>{Math.round(this.props.modelTrainedResult.trainingModelTime * 1000) / 1000}</td>
                    </tr>
                    <tr style={{color: "#6ec923"}}>
                        <td>Time<br/>(compute metrics)</td>
                        <td>{Math.round(this.props.modelTrainedResult.calculateMetricsTime * 1000) / 1000}</td>
                    </tr>
                    </tbody>
                )
            }
            result = (
                <table className="table table-striped table-dark" style={{fontSize: "1vw", color: "#fff"}}>
                    <thead style={{backgroundColor: "#6e4888"}}>
                    <tr className="text-center">
                        <th colSpan="2">Summary</th>
                    </tr>
                    </thead>
                    {metrics}
                </table>
            )
        }
        return (
            <div className="pt-2">
                {result}
            </div>

        )
    }
}

Summary.propTypes = {
    modelTrainedResult: PropTypes.object,
};

export default Summary;
