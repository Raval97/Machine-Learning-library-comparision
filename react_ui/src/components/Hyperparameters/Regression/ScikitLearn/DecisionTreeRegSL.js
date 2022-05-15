import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputGroupPattern from "../../../InputGroupPattern";

class DecisionTreeRegSL extends Component {
    constructor() {
        super();
        this.state = {
            splitter:"best",
            criterion:"squared_error",
            maxDepth: 200,
            minSamplesSplit: 2,
            minSamplesLeaf: 1,
            minWeightFractionLeaf: 0,
            maxFeatures: "auto",
            maxLeafNodes: 100,
            minImpurityDecrease: 0.0,
            randomState: 1,
            ccpAlpha: 0.0,
        };
        this.onChangeCriterion = this.onChangeCriterion.bind(this)
        this.onChangeSplitter = this.onChangeSplitter.bind(this)
        this.onChangeMaxDepth = this.onChangeMaxDepth.bind(this)
        this.onChangeMinSamplesSplit = this.onChangeMinSamplesSplit.bind(this)
        this.onChangeMinSamplesLeaf = this.onChangeMinSamplesLeaf.bind(this)
        this.onChangeMinWeightFractionLeaf = this.onChangeMinWeightFractionLeaf.bind(this)
        this.onChangeMaxFeatures = this.onChangeMaxFeatures.bind(this)
        this.onChangeMaxLeafNodes = this.onChangeMaxLeafNodes.bind(this)
        this.onChangeMinImpurityDecrease = this.onChangeMinImpurityDecrease.bind(this)
        this.onChangeRandomState = this.onChangeRandomState.bind(this)
        this.onChangeCcpAlpha = this.onChangeCcpAlpha.bind(this)
    }

    async onChangeCriterion(e) {
        await this.setState({
            criterion: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeSplitter(e) {
        await this.setState({
            splitter: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeMaxDepth(e) {
        await this.setState({
            maxDepth: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeMinSamplesSplit(e) {
        await this.setState({
            minSamplesSplit: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeMinSamplesLeaf(e) {
        await this.setState({
            minSamplesLeaf: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeMinWeightFractionLeaf(e) {
        await this.setState({
            minWeightFractionLeaf: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeMaxFeatures(e) {
        await this.setState({
            maxFeatures: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeMaxLeafNodes(e){
        await this.setState({
            maxLeafNodes: parseInt(e.target.value)
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeMinImpurityDecrease(e){
        await this.setState({
            minImpurityDecrease: parseFloat(e.target.value)
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeRandomState(e){
        await this.setState({
            randomState: parseFloat(e.target.value)
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeCcpAlpha(e){
        await this.setState({
            ccpAlpha: parseFloat(e.target.value)
        })
        this.props.actualizeHyperparameters(this.state)
    }

    render() {

        let criterionSelector = (
            <InputGroupPattern
                text={"Criterion"}
                infoText={"The function to measure the quality of a split. Supported criteria are\n" +
                    "\"gini\" for the Gini impurity and \"entropy\" for the information gain."}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeCriterion} value={this.state.criterion}>
                        <option value="squared_error">squared error</option>
                        <option value="absolute_error">absolute error</option>
                        <option value="poisson">poisson</option>
                        <option value="friedman_mse">friedman mse</option>
                    </select>
                )}
                colWeight={"col-6"}
            />
        )
        let splitterSelector = (
            <InputGroupPattern
                text={"Criterion"}
                infoText={"The function to measure the quality of a split. Supported criteria\n" +
                    "are \"squared_error\" for the mean squared error, which is equal to\n" +
                    "variance reduction as feature selection criterion and minimizes the L2\n" +
                    "loss using the mean of each terminal node, \"friedman_mse\", which uses\n" +
                    "mean squared error with Friedman's improvement score for potential\n" +
                    "splits, \"absolute_error\" for the mean absolute error, which minimizes\n" +
                    "the L1 loss using the median of each terminal node, and \"poisson\" which\n" +
                    "uses reduction in Poisson deviance to find splits"}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeMinSamplesSplit} value={this.state.splitter}>
                        <option value="best">best</option>
                        <option value="random">random</option>
                    </select>
                )}
                colWeight={"col-6"}
            />
        )
        let maxDepthSelector = (
            <InputGroupPattern
                text={"Max Depth"}
                infoText={"The maximum depth of the tree. If None, then nodes are expanded until\n" +
                    "all leaves are pure or until all leaves contain less than min_samples_split samples"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.maxDepth}
                           value={this.state.maxDepth}
                           min={1}
                           max={20}
                           step={1}
                           onChange={this.onChangeMaxDepth}/>
                )}
                colWeight={"col-6"}
            />
        )
        let minSamplesSplitSelector = (
            <InputGroupPattern
                text={"Min samples split"}
                infoText={"The minimum number of samples required to split an internal node:"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.minSamplesSplit}
                           value={this.state.minSamplesSplit}
                           min={1}
                           max={20}
                           step={1}
                           onChange={this.onChangeMinSamplesSplit}/>
                )}
                colWeight={"col-6"}
            />
        )
        let minSamplesLeafSelector = (
            <InputGroupPattern
                text={"Min samples leaf"}
                infoText={"The minimum number of samples required to be at a leaf node.\n" +
                    "A split point at any depth will only be considered if it leaves at\n" +
                    "least ``min_samples_leaf`` training samples in each of the left and\n" +
                    "right branches.  This may have the effect of smoothing the model,\n" +
                    "especially in regression"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.minSamplesLeaf}
                           value={this.state.minSamplesLeaf}
                           min={1}
                           max={20}
                           step={1}
                           onChange={this.onChangeMinSamplesLeaf}/>
                )}
                colWeight={"col-6"}
            />
        )
        let minWeightFractionLeafSelector = (
            <InputGroupPattern
                text={"Min Weight Fraction Leaf"}
                infoText={"The minimum weighted fraction of the sum total of weights (of all  the input samples) " +
                    "required to be at a leaf node. Samples have equal weight when sample_weight is not provided."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.minWeightFractionLeaf}
                           value={this.state.minWeightFractionLeaf}
                           min={0}
                           max={1}
                           step={0.1}
                           onChange={this.onChangeMinWeightFractionLeaf}/>
                )}
                colWeight={"col-6"}
            />
        )
        let maxFeaturesSelector = (
            <InputGroupPattern
                text={"Max Features"}
                infoText={"The number of features to consider when looking for the best split"}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeMaxFeatures} value={this.state.maxFeatures}>
                        <option value="auto">auto</option>
                        <option value="sqrt">sqrt</option>
                        <option value="log2">log2</option>
                    </select>
                )}
                colWeight={"col-6"}
            />
        )
        let maxLeafNodesSelector = (
            <InputGroupPattern
                text={"Max Leaf Nodes"}
                infoText={"Grow trees with ``max_leaf_nodes`` in best-first fashion.\n" +
                    "Best nodes are defined as relative reduction in impurity. " +
                    "If None then unlimited number of leaf nodes"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.maxLeafNodes}
                           value={this.state.maxLeafNodes}
                           min={2}
                           max={200}
                           step={1}
                           onChange={this.onChangeMaxLeafNodes}/>
                )}
                colWeight={"col-6"}
                />
        )
        let minImpurityDecreaseSelector = (
            <InputGroupPattern
                text={"Min Impurity Decrease"}
                infoText={"A node will be split if this split induces a decrease of the impurity greater than or equal to this value"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.minImpurityDecrease}
                           value={this.state.minImpurityDecrease}
                           min={0}
                           max={2}
                           step={0.1}
                           onChange={this.onChangeMinImpurityDecrease}/>
                )}
                colWeight={"col-6"}
                />
        )
        let randomStateSelector = (
            <InputGroupPattern
                text={"Random State"}
                infoText={"Controls both the randomness of the bootstrapping of the samples used\n" +
                    "when building trees (if ``bootstrap=True``) and the sampling of the\n" +
                    "features to consider when looking for the best split at each node"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.randomState}
                           value={this.state.randomState}
                           min={0}
                           max={100}
                           step={1}
                           onChange={this.onChangeRandomState}/>
                )}
                colWeight={"col-6"}
            />
        )
        let ccpAlphaSelector = (
            <InputGroupPattern
                text={"CCP Alpha"}
                infoText={"Complexity parameter used for Minimal Cost-Complexity Pruning. The\n" +
                    "subtree with the largest cost complexity that is smaller than\n" +
                    "``ccp_alpha`` will be chosen. By default, no pruning is performed."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.ccpAlpha}
                           value={this.state.ccpAlpha}
                           min={0}
                           max={20}
                           step={0.1}
                           onChange={this.onChangeCcpAlpha}/>
                )}
                colWeight={"col-6"}
            />
        )

        return (
            <div>
                <div className="d-flex mx-auto pb-3">
                    {criterionSelector}
                    {splitterSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {maxDepthSelector}
                    {minSamplesSplitSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {minSamplesLeafSelector}
                    {minWeightFractionLeafSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {maxFeaturesSelector}
                    {maxLeafNodesSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {minImpurityDecreaseSelector}
                    {randomStateSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {ccpAlphaSelector}
                </div>
            </div>
        )
    }
}

DecisionTreeRegSL.propTypes = {
    actualizeHyperparameters: PropTypes.any
};

export default DecisionTreeRegSL;
