import React, {Component} from 'react';
import PropTypes from 'prop-types';
import InputGroupPattern from "../../../InputGroupPattern";

class RandomForrestClass extends Component {
    constructor() {
        super();
        this.state = {
            numTrees: 20,
            bootstrap: true,
            maxDepth: 5,
            maxBins: 32,
            minInstancesPerNode: 1,
            minWeightFractionPerNode: 0,
            minInfoGain: 0,
            maxMemoryInMB: 256,
            cacheNodeIds: false,
            checkpointInterval: 10,
            subsamplingRate: 1,
            featureSubsetStrategy: "auto"
        };
        this.onChangeNumTrees = this.onChangeNumTrees.bind(this)
        this.onChangeBootstrap = this.onChangeBootstrap.bind(this)
        this.onChangeMaxDepth = this.onChangeMaxDepth.bind(this)
        this.onChangeMaxBins = this.onChangeMaxBins.bind(this)
        this.onChangeMinInstancesPerNode = this.onChangeMinInstancesPerNode.bind(this)
        this.onChangeMinWeightFractionPerNode = this.onChangeMinWeightFractionPerNode.bind(this)
        this.onChangeMinInfoGain = this.onChangeMinInfoGain.bind(this)
        this.onChangeMaxMemoryInMB = this.onChangeMaxMemoryInMB.bind(this)
        this.onChangeCacheNodeIds = this.onChangeCacheNodeIds.bind(this)
        this.onChangeCheckpointInterval = this.onChangeCheckpointInterval.bind(this)
        this.onChangeSubsamplingRate = this.onChangeSubsamplingRate.bind(this)
        this.onChangeFeatureSubsetStrategy = this.onChangeFeatureSubsetStrategy.bind(this)
    }

    async onChangeNumTrees(e) {
        await this.setState({
            numTrees: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeBootstrap(e) {
        await this.setState({
            bootstrap: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeMaxDepth(e) {
        await this.setState({
            maxDepth: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeMaxBins(e) {
        await this.setState({
            maxBins: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeMinInstancesPerNode(e) {
        await this.setState({
            minInstancesPerNode: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeMinWeightFractionPerNode(e) {
        await this.setState({
            minWeightFractionPerNode: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeMinInfoGain(e) {
        await this.setState({
            minInfoGain: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeMaxMemoryInMB(e) {
        await this.setState({
            maxMemoryInMB: parseInt(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeCacheNodeIds(e) {
        await this.setState({
            cacheNodeIds: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeCheckpointInterval(e) {
        await this.setState({
            checkpointInterval: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeSubsamplingRate(e) {
        await this.setState({
            subsamplingRate: parseFloat(e.target.value),
        })
        this.props.actualizeHyperparameters(this.state)
    }

    async onChangeFeatureSubsetStrategy(e) {
        await this.setState({
            featureSubsetStrategy: e.target.value,
        })
        this.props.actualizeHyperparameters(this.state)
    }

    render() {

        let numTreesSelector = (
            <InputGroupPattern
                text={"Num trees"}
                infoText={"Number of trees to train (at least 1). If 1, then no bootstrapping is used. If greater than 1, " +
                    "then bootstrapping is done. TODO: Change to always do bootstrapping (simpler). " +
                    "SPARK-7130 (default = 20)\n Note: The reason that we cannot add this to both GBT and RF (i.e. in " +
                    "TreeEnsembleParams) is the param maxIter controls how many trees a GBT has. The semantics in the " +
                    "algorithms are a bit different."}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.numTrees}
                           value={this.state.numTrees}
                           min={1}
                           max={50}
                           step={1}
                           onChange={this.onChangeNumTrees}/>
                )}
                colWeight={"col-6"}
            />
        )

        let bootstrapSelector = (
            <InputGroupPattern
                text={"Bootstrap"}
                infoText={"Whether bootstrap samples are used when building trees."}
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

        let maxDepthSelector = (
            <InputGroupPattern
                text={"Max Depth"}
                infoText={"Maximum depth of the tree (nonnegative). E.g., depth 0 means 1 leaf node; " +
                    "depth 1 means 1 internal node + 2 leaf nodes. (default = 5)"}
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
        let minWeightFractionPerNodeSelector = (
            <InputGroupPattern
                text={"Min Weight Fraction Per Node"}
                infoText={"Minimum fraction of the weighted sample count that each child must have after split. " +
                    "If a split causes the fraction of the total weight in the left or right child to be less than " +
                    "minWeightFractionPerNode, the split will be discarded as invalid. " +
                    "Should be in the interval [0.0, 0.5). (default = 0.0)"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.minWeightFractionPerNode}
                           value={this.state.minWeightFractionPerNode}
                           min={0}
                           max={1}
                           step={0.05}
                           onChange={this.onChangeMinWeightFractionPerNode}/>
                )}
                colWeight={"col-6"}
            />
        )
        let maxBinsSelector = (
            <InputGroupPattern
                text={"Max Bins"}
                infoText={"Maximum number of bins used for discretizing continuous features and for choosing how to " +
                    "split on features at each node. More bins give higher granularity. Must be at least 2 and at least " +
                    "number of categories in any categorical feature. (default = 32)"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.maxBins}
                           value={this.state.maxBins}
                           min={2}
                           max={100}
                           step={1}
                           onChange={this.onChangeMaxBins}/>
                )}
                colWeight={"col-6"}
            />
        )
        let minInstancesPerNodeSelector = (
            <InputGroupPattern
                text={"Min Instances Per Node"}
                infoText={"Minimum number of instances each child must have after split. If a split causes the left or " +
                    "right child to have fewer than minInstancesPerNode, the split will be discarded as invalid. " +
                    "Must be at least 1. (default = 1)"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.minInstancesPerNode}
                           value={this.state.minInstancesPerNode}
                           min={1}
                           max={20}
                           step={1}
                           onChange={this.onChangeMinInstancesPerNode}/>
                )}
                colWeight={"col-6"}
            />
        )
        let minInfoGainSelector = (
            <InputGroupPattern
                text={"Min Info Gain"}
                infoText={"Minimum information gain for a split to be considered at a tree node. " +
                    "Should be at least 0.0. (default = 0.0)"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.minInfoGain}
                           value={this.state.minInfoGain}
                           min={0}
                           max={1}
                           step={0.05}
                           onChange={this.onChangeMinInfoGain}/>
                )}
                colWeight={"col-6"}
            />
        )
        let maxMemoryInMBSelector = (
            <InputGroupPattern
                text={"Max Memory In MB"}
                infoText={"Maximum memory in MB allocated to histogram aggregation. If too small, then 1 node will " +
                    "be split per iteration, and its aggregates may exceed this size. (default = 256 MB)"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.maxMemoryInMB}
                           value={this.state.maxMemoryInMB}
                           min={64}
                           max={2048}
                           step={64}
                           onChange={this.onChangeMaxMemoryInMB}/>
                )}
                colWeight={"col-6"}
            />
        )
        let cacheNodeIdsSelector = (
            <InputGroupPattern
                text={"Cache Node Ids"}
                infoText={"If false, the algorithm will pass trees to executors to match instances with nodes. " +
                    "If true, the algorithm will cache node IDs for each instance. Caching can speed up training " +
                    "of deeper trees. Users can set how often should the cache be checkpointed or disable it by setting checkpointInterval. (default = false)"}
                input={(
                    <select className="custom-select col-10"
                            onChange={this.onChangeCacheNodeIds} value={this.state.cacheNodeIds}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </select>
                )}
                colWeight={"col-6"}
            />
        )
        let checkpointIntervalSelector = (
            <InputGroupPattern
                text={"Checkpoint Interval"}
                infoText={"Specifies how often to checkpoint the cached node IDs. E.g. 10 means that the cache will get " +
                    "checkpointed every 10 iterations. This is only used if cacheNodeIds is true and if the checkpoint " +
                    "directory is set in org.apache.spark.SparkContext. Must be at least 1. (default = 10)"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.checkpointInterval}
                           value={this.state.checkpointInterval}
                           min={2}
                           max={20}
                           step={1}
                           onChange={this.onChangeCheckpointInterval}/>
                )}
                colWeight={"col-6"}
            />
        )

        let subsamplingRateSelector = (
            <InputGroupPattern
                text={"Subsampling Rate"}
                infoText={"Fraction of the training data used for learning each decision tree, in range (0, 1]. (default = 1.0"}
                input={(
                    <input className="col-10" type="number"
                           placeholder={this.state.subsamplingRate}
                           value={this.state.subsamplingRate}
                           min={0}
                           max={1}
                           step={0.05}
                           onChange={this.onChangeSubsamplingRate}/>
                )}
                colWeight={"col-6"}
            />
        )

        let featureSubsetStrategySelector = (
            <InputGroupPattern
                text={"Feature Subset Strategy"}
                infoText={"The number of features to consider for splits at each tree node. Supported options:\n" +
                    "\"auto\": Choose automatically for task: If numTrees == 1, set to \"all.\" " +
                    "If numTrees greater than 1 (forest), set to \"sqrt\" for classification and to \"onethird\" for regression.\n" +
                    "\"all\": use all features\n" +
                    "\"onethird\": use 1/3 of the features\n" +
                    "\"sqrt\": use sqrt(number of features)\n" +
                    "\"log2\": use log2(number of features)\n" +
                    "\"n\": when n is in the range (0, 1.0], use n * number of features. When n is in the range " +
                    "(1, number of features), use n features. (default = \"auto\")\n" +
                    "These various settings are based on the following references:\n" +
                    "log2: tested in Breiman (2001)\n" +
                    "sqrt: recommended by Breiman manual for random forests\n" +
                    "The defaults of sqrt (classification) and onethird (regression) match the R randomForest package."}
                input={(
                    <select className="custom-select col-10"
                            onChange={this.onChangeFeatureSubsetStrategy} value={this.state.featureSubsetStrategy}>
                        <option value={"auto"}>Auto</option>
                        <option value={"all"}>All</option>
                        <option value={"onethird"}>Onethird</option>
                        <option value={"sqrt"}>Sqrt</option>
                        <option value={"log2"}>Log2</option>
                        <option value={"n"}>N</option>
                    </select>
                )}
                colWeight={"col-6"}
            />
        )

        return (
            <div>
                <div className="d-flex mx-auto pb-3">
                    {numTreesSelector}
                    {bootstrapSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {maxDepthSelector}
                    {maxBinsSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {minInstancesPerNodeSelector}
                    {minWeightFractionPerNodeSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {minInfoGainSelector}
                    {maxMemoryInMBSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {cacheNodeIdsSelector}
                    {checkpointIntervalSelector}
                </div>
                <div className="d-flex mx-auto pb-3">
                    {subsamplingRateSelector}
                    {featureSubsetStrategySelector}
                </div>
            </div>
        )
    }
}

RandomForrestClass.propTypes = {
    actualizeHyperparameters: PropTypes.any
};

export default RandomForrestClass;
