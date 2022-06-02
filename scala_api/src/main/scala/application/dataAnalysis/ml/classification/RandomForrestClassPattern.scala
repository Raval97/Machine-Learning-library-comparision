package application.dataAnalysis.ml.classification

import application.dataAnalysis.interfaces.ModelPrepare
import org.apache.spark.ml.PipelineStage
import org.apache.spark.ml.classification.RandomForestClassifier
import org.apache.spark.ml.util.MLWritable
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class RandomForrestClassPattern(
  numTrees: Option[Int] = None,
  bootstrap: Option[Boolean] = None,
  maxDepth: Option[Int] = None,
  maxBins: Option[Int] = None,
  minInstancesPerNode: Option[Int] = None,
  minWeightFractionPerNode: Option[Double] = None,
  minInfoGain: Option[Double] = None,
  maxMemoryInMB: Option[Int] = None,
  cacheNodeIds: Option[Boolean] = None,
  checkpointInterval: Option[Int] = None,
  subsamplingRate: Option[Double] = None,
  featureSubsetStrategy: Option[String] = None
) extends ModelPrepare {
  override def prepareModel: PipelineStage with MLWritable =
    new RandomForestClassifier()
      .setNumTrees(numTrees.getOrElse(20))
      .setBootstrap(bootstrap.getOrElse(true))
      .setMaxDepth(maxDepth.getOrElse(5))
      .setMaxBins(maxBins.getOrElse(32))
      .setMinInstancesPerNode(minInstancesPerNode.getOrElse(1))
      .setMinWeightFractionPerNode(minWeightFractionPerNode.getOrElse(0.0))
      .setMinInfoGain(minInfoGain.getOrElse(0.0))
      .setMaxMemoryInMB(maxMemoryInMB.getOrElse(256))
      .setCacheNodeIds(cacheNodeIds.getOrElse(false))
      .setCheckpointInterval(checkpointInterval.getOrElse(10))
      .setSubsamplingRate(subsamplingRate.getOrElse(1.0))
      .setFeatureSubsetStrategy(featureSubsetStrategy.getOrElse("auto"))
      .setFeaturesCol("indexedFeatures")
      .setLabelCol("indexedLabel")
}

trait RandomForrestClassPatternJsonProtocol extends DefaultJsonProtocol {
  implicit val randomForrestClassFormat: RootJsonFormat[RandomForrestClassPattern] = jsonFormat12(RandomForrestClassPattern)
}
