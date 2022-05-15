import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import PropTypes from 'prop-types';
import HomePage from "../containers/HomePage";

class AppNavigation extends Component {

    render() {
        return (
            <Router>
                <Route path="/" exact render={(props) => <HomePage
                    apiVersion={this.props.apiVersion}
                    fileName={this.props.fileName}
                    dataStatistics={this.props.dataStatistics}
                    modelTrainedResult={this.props.modelTrainedResult}
                    predictedLabel={this.props.predictedLabel}
                    functions={this.props.functions}
                />}/>
            </Router>
        );
    }
}

AppNavigation.propTypes = {
    apiVersion: PropTypes.string,
    fileName: PropTypes.string,
    dataStatistics: PropTypes.object,
    modelTrainedResult: PropTypes.object,
    predictedLabel: PropTypes.any,
    functions: PropTypes.object
};

export default AppNavigation;
