import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ApiVersion extends Component {

    render() {
        let apiVersionSelector = (
            <div className="input-group">
                <div className="input-group-prepend" style={{width:"30%"}}>
                    <label className="input-group-text col-12">Api Version</label>
                </div>
                <div className="input-group-append" style={{width:"70%"}}>
                    <select className="custom-select col-12"
                            style={{backgroundColor: "#499b49", color: "#ffffff"}}
                            onChange={this.props.actualizeApiVersion} value={this.props.apiVersion}>
                        <option value="Scala & Spark Api">Scala & Spark Api</option>
                        <option value="Python & Spark Api">Python & Spark Api</option>
                        <option value="Python & Scikit Learn Api">Python & Scikit Learn Api</option>
                    </select>
                </div>
            </div>

        )

        return (
            <div className="d-flex mx-auto w-50 pb-3">
                {apiVersionSelector}
            </div>
        )
    }
}

ApiVersion.propTypes = {
    apiVersion: PropTypes.string,
    actualizeApiVersion: PropTypes.any
};

export default ApiVersion;
