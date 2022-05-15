package application.dataAnalysis.ml.classification

import application.dataAnalysis.interfaces.ModelPrepare
import org.apache.spark.ml.PipelineStage
import org.apache.spark.ml.classification.{DecisionTreeClassifier, NaiveBayes}
import org.apache.spark.ml.util.MLWritable
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class DecisionTreeClassPattern(
  maxDepth: Option[Int] = None,
  maxBins: Option[Int] = None,
  minInstancesPerNode: Option[Int] = None,
  minWeightFractionPerNode: Option[Double] = None,
  minInfoGain: Option[Double] = None,
  maxMemoryInMB: Option[Int] = None,
  cacheNodeIds: Option[Boolean] = None,
  checkpointInterval: Option[Int] = None
) extends ModelPrepare {
  override def prepareModel: PipelineStage with MLWritable =
    new DecisionTreeClassifier()
      .setMaxDepth(maxDepth.getOrElse(5))
      .setMaxBins(maxBins.getOrElse(32))
      .setMinInstancesPerNode(minInstancesPerNode.getOrElse(1))
      .setMinWeightFractionPerNode(minWeightFractionPerNode.getOrElse(0.0))
      .setMinInfoGain(minInfoGain.getOrElse(0.0))
      .setMaxMemoryInMB(maxMemoryInMB.getOrElse(256))
      .setCacheNodeIds(cacheNodeIds.getOrElse(false))
      .setCheckpointInterval(checkpointInterval.getOrElse(10))
      .setFeaturesCol("indexedFeatures")
      .setLabelCol("indexedLabel")
}

trait DecisionTreeClassPatternJsonProtocol extends DefaultJsonProtocol {
  implicit val decisionTreeClassFormat: RootJsonFormat[DecisionTreeClassPattern] = jsonFormat8(DecisionTreeClassPattern)
}
