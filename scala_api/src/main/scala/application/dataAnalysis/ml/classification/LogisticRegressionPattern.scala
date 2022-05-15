package application.dataAnalysis.ml.classification

import application.dataAnalysis.interfaces.ModelPrepare
import org.apache.spark.ml.PipelineStage
import org.apache.spark.ml.classification.LogisticRegression
import org.apache.spark.ml.util.MLWritable
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class LogisticRegressionPattern(
  regParam: Option[Double] = None,
  maxIter: Option[Int] = None,
  elasticNetParam: Option[Double] = None,
  tol: Option[Double] = None,
  fitIntercept: Option[Boolean] = None,
  family: Option[String] = None,
  standardization: Option[Boolean] = None,
  threshold: Option[Double] = None,
  aggregationDepth: Option[Int] = None
) extends ModelPrepare {
  override def prepareModel: PipelineStage with MLWritable =
    new LogisticRegression()
      .setRegParam(regParam.getOrElse(0.0))
      .setMaxIter(maxIter.getOrElse(100))
      .setElasticNetParam(elasticNetParam.getOrElse(0.0))
      .setTol(tol.getOrElse(1E-6))
      .setFitIntercept(fitIntercept.getOrElse(true))
      .setFamily(family.getOrElse("auto"))
      .setStandardization(standardization.getOrElse(true))
      .setThreshold(threshold.getOrElse(0.5))
      .setAggregationDepth(aggregationDepth.getOrElse(2))
      .setFeaturesCol("indexedFeatures")
      .setLabelCol("indexedLabel")
}

trait LogisticRegressionPatternJsonProtocol extends DefaultJsonProtocol {
  implicit val logisticRegressionFormat: RootJsonFormat[LogisticRegressionPattern] = jsonFormat9(LogisticRegressionPattern)
}
