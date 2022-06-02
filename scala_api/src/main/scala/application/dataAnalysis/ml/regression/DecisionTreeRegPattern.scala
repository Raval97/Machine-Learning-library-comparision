package application.dataAnalysis.ml.regression

import application.dataAnalysis.interfaces.ModelPrepare
import org.apache.spark.ml.PipelineStage
import org.apache.spark.ml.regression.DecisionTreeRegressor
import org.apache.spark.ml.util.MLWritable
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class DecisionTreeRegPattern(
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
    new DecisionTreeRegressor()
      .setMaxDepth(maxDepth.getOrElse(5))
      .setMaxBins(maxBins.getOrElse(32))
      .setMinInstancesPerNode(minInstancesPerNode.getOrElse(1))
      .setMinWeightFractionPerNode(minWeightFractionPerNode.getOrElse(0.0))
      .setMinInfoGain(minInfoGain.getOrElse(0.0))
      .setMaxMemoryInMB(maxMemoryInMB.getOrElse(256))
      .setCacheNodeIds(cacheNodeIds.getOrElse(false))
      .setCheckpointInterval(checkpointInterval.getOrElse(10))
      .setFeaturesCol("indexedFeatures")
      .setLabelCol("label")
}

trait DecisionTreeRegPatternJsonProtocol extends DefaultJsonProtocol {
  implicit val decisionTreeRegFormat: RootJsonFormat[DecisionTreeRegPattern] = jsonFormat8(DecisionTreeRegPattern)
}
