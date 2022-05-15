import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputGroupPattern from "../../../InputGroupPattern";

class RandomForrestClassSL extends Component {
    constructor() {
        super();
        this.state = {
            nEstimators: 100,
            criterion:"gini",
            maxDepth: 200,
            minSamplesSplit: 2,
            minSamplesLeaf: 1,
            minWeightFractionLeaf: 0,
            maxFeatures: "auto",
            maxLeafNodes: 100,
            minImpurityDecrease: 0.0,
            bootstrap: true,
            oobScore: false,
            nJobs: 1,
            randomState: 1,
            verbose: 0,
            warmStart: false,
            ccpAlpha: 0.0,
        };
        this.onChangeNEstimators = this.onChangeNEstimators.bind(this)
        this.onChangeCriterion = this.onChangeCriterion.bind(this)
        this.onChangeMinSamplesSplit = this.onChangeMinSamplesSplit.bind(this)
        this.onChangeMaxDepth = this.onChangeMaxDepth.bind(this)
        this.onChangeMinSamplesLeaf = this.onChangeMinSamplesLeaf.bind(this)
        this.onChangeMinWeightFractionLeaf = this.onChangeMinWeightFractionLeaf.bind(this)
        this.onChangeMaxFeatures = this.onChangeMaxFeatures.bind(this)
        this.onChangeBootstrap = this.onChangeBootstrap.bind(this)
        this.onChangeMaxLeafNodes = this.onChangeMaxLeafNodes.bind(this)
        this.onChangeMinImpurityDecrease = this.onChangeMinImpurityDecrease.bind(this)
        this.onChangeOobScore = this.onChangeOobScore.bind(this)
        this.onChangeNJobs = this.onChangeNJobs.bind(this)
        this.onChangeRandomState = this.onChangeRandomState.bind(this)
        this.onChangeVerbose = this.onChangeVerbose.bind(this)
        this.onChangeWarmStart = this.onChangeWarmStart.bind(this)
        this.onChangeCcpAlpha = this.onChangeCcpAlpha.bind(this)
    }

    async onChangeNEstimators(e) {
        await this.setState({
            nEstimators: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeCriterion(e) {
        await this.setState({
            criterion: e.target.value,
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
    async onChangeBootstrap(e) {
        await this.setState({
            bootstrap: e.target.value,
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
    async onChangeOobScore(e){
        await this.setState({
            oobScore: e.target.value
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeNJobs(e){
        await this.setState({
            nJobs: parseFloat(e.target.value)
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeRandomState(e){
        await this.setState({
            randomState: parseFloat(e.target.value)
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeVerbose(e){
        await this.setState({
            verbose: parseFloat(e.target.value)
        })
        this.props.actualizeHyperparameters(this.state)
    }
    async onChangeWarmStart(e){
        await this.setState({
            warmStart: e.target.value
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

        let nEstimatorsSelector = (
            <InputGroupPattern
                text={"N Estimators"}
                infoText={"The number of trees in the forest"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.nEstimators}
                           value={this.state.nEstimators}
                           min={1}
                           max={100}
                           step={200}
                           onChange={this.onChangeNEstimators}/>
                )}
                colWeight={"col-6"}
            />
        )
        let criterionSelector = (
            <InputGroupPattern
                text={"Criterion"}
                infoText={"The function to measure the quality of a split. Supported criteria are\n" +
                    "\"gini\" for the Gini impurity and \"entropy\" for the information gain."}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeCriterion} value={this.state.criterion}>
                        <option value="gini">Gini</option>
                        <option value="entropy">Entropy</option>
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
                           min={5}
                           max={500}
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
        let bootstrapSelector = (
            <InputGroupPattern
                text={"Bootstrap"}
                infoText={"Whether bootstrap samples are used when building trees. If False, the whole dataset is used to build each tree."}
                input={(
                    <select className="custom-select col-10"
                            onChange={this.onChangeBootstrap} value={this.state.bootstrap}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                )}
                colWeight={"col-6"}
            />
        )
        let oobScoreSelector = (
            <InputGroupPattern
                text={"OOB Score"}
                infoText={"Whether to use out-of-bag samples to estimate the generalization score. Only available if bootstrap=True."}
                input={(
                    <select className="custom-select col-10"
                            onChange={this.onChangeOobScore} value={this.state.oobScore}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                )}
                colWeight={"col-6"}
            />
        )
        let nJobsSelector = (
            <InputGroupPattern
                text={"N Jobs"}
                infoText={"The number of jobs to use for the computation. This will only provide\n" +
                    "        speedup in case of sufficiently large problems, that is if firstly\n" +
                    "        `n_targets > 1` and secondly `X` is sparse or if `positive` is set\n" +
                    "        to `True`. ``None`` means 1 unless in a\n" +
                    "        :obj:`joblib.parallel_backend` context. ``-1`` means using all\n" +
                    "        processors"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.nJobs}
                           value={this.state.nJobs}
                           min={-1}
                           max={32}
                           step={1}
                           onChange={this.onChangeNJobs}/>
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
        let verboseSelector = (
            <InputGroupPattern
                text={"Verbose"}
                infoText={"Controls the verbosity when fitting and predicting."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.verbose}
                           value={this.state.verbose}
                           min={0}
                           max={100}
                           step={1}
                           onChange={this.onChangeVerbose}/>
                )}
                colWeight={"col-6"}
            />
        )
        let warmStartSelector = (
            <InputGroupPattern
                text={"Warm Start"}
                infoText={"When set to ``True``, reuse the solution of the previous call to fit\n" +
                    "and add more estimators to the ensemble, otherwise, just fit a whole new forest"}
                input={(
                    <select className="custom-select col-10" id="inputGroupSelect01"
                            onChange={this.onChangeWarmStart} value={this.state.warmStart}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
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
                    {nEstimatorsSelector}
                    {criterionSelector}
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
                    {bootstrapSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {oobScoreSelector}
                    {nJobsSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {randomStateSelector}
                    {verboseSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {ccpAlphaSelector}
                    {warmStartSelector}
                </div>
            </div>
        )
    }
}

RandomForrestClassSL.propTypes = {
    actualizeHyperparameters: PropTypes.any
};

export default RandomForrestClassSL;
