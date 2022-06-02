import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button} from "react-bootstrap";

class FileSelection extends Component {
    constructor() {
        super();
        this.state = {
            fileSelected: null,
            fileSelectedName: "Video_Games_Sales_as_at_22_Dec_2016.csv"
        };
        this.onChangeFileSelected = this.onChangeFileSelected.bind(this);
        this.onChangeFileSelectedName = this.onChangeFileSelectedName.bind(this);
    }

    onChangeFileSelectedName(e) {
        this.setState({
            fileSelectedName: e.target.value
        })
    }

    onChangeFileSelected(e) {
        this.setState({
            fileSelected: e.target.files[0]
        })
    }

    render() {
        let uploadFile = <div/>
        // if (this.props.apiVersion === "Scala & Spark Api")
            uploadFile = (
                <div className="d-flex mb-3">
                    <div className="input-group w-75">
                        <div className="input-group-prepend w-75">
                            <input className="form-control pt-2" type="file" name="myFile"
                                   onChange={e => {
                                       this.onChangeFileSelected(e);
                                   }}
                            />
                        </div>
                        <Button variant="info w-25" type="submit"
                                onClick={() => this.props.uploadFile(this.state)}>
                            Upload File
                        </Button>
                    </div>
                </div>
            )
        let yellow_tripdata_21_03 = (this.props.apiVersion === "Python & Scikit Learn Api") ?
            <option value="yellow_tripdata_2021-03.csv">Yellow trip data 2021-03</option> :
            <option value="yellow_tripdata_2021-03_df">Yellow trip data 2021-03</option>
        let yellow_tripdata_22_02 = (this.props.apiVersion === "Python & Scikit Learn Api") ?
            <option value="yellow_tripdata_2022-02.csv">Yellow trip data 2022-02</option> :
            <option value="yellow_tripdata_2022-02_df">Yellow trip data 2022-02</option>
        let yellow_tripdata_16_12 = (this.props.apiVersion === "Python & Scikit Learn Api") ?
            <option value="yellow_tripdata_2016-12.csv">Yellow trip data 2016-12</option> :
            <option value="yellow_tripdata_2016-12_df">Yellow trip data 2016-12</option>
        let creditcard = (this.props.apiVersion === "Python & Scikit Learn Api") ?
            <option value="creditcard.csv">Credit Card</option> :
            <option value="creditcard_df">Credit Card</option>

        let loadFile = (
            <div className="d-flex">
                <div className="input-group w-75">
                    <div className="input-group-prepend w-75">
                        <select className="custom-select col-12" id="inputGroupSelect01"
                                onChange={(e) => this.onChangeFileSelectedName(e)}
                                value={this.state.fileSelectedName}>
                            <option value="bike_sharing.csv">Bike sharing</option>
                            <option value="Video_Games_Sales_as_at_22_Dec_2016.csv">Video games sales</option>
                            {creditcard}
                            {yellow_tripdata_21_03}
                            {yellow_tripdata_22_02}
                            {yellow_tripdata_16_12}
                        </select>
                    </div>
                    <Button variant="info w-25" type="submit"
                            onClick={() => this.props.loadFile(this.state.fileSelectedName)}>
                        Load File
                    </Button>
                </div>
            </div>
        )
        return (
            <div className="d-flex">
                <div className="w-50">
                    {uploadFile}
                    {loadFile}
                </div>
                <div className="w-50 my-auto" style={{fontSize: "1.5vw", color: "#f9fdfc"}}>
                    {this.props.fileName}
                </div>
            </div>
        )
    }
}

FileSelection.propTypes = {
    apiVersion: PropTypes.string,
    fileName: PropTypes.string,
    loadFile: PropTypes.any
};

export default FileSelection;
