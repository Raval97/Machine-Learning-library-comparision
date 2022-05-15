package application.dataAnalysis.ml.classification

import application.dataAnalysis.interfaces.ModelPrepare
import org.apache.spark.ml.PipelineStage
import org.apache.spark.ml.classification.NaiveBayes
import org.apache.spark.ml.util.MLWritable
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class NaiveBayesPattern(
  smoothing: Option[Double] = None,
  modelType: Option[String] = None
) extends ModelPrepare {
  override def prepareModel: PipelineStage with MLWritable =
    new NaiveBayes()
      .setSmoothing(smoothing.getOrElse(1.0))
      .setModelType(modelType.getOrElse("multinomial"))
      .setFeaturesCol("indexedFeatures")
      .setLabelCol("indexedLabel")
}

trait NaiveBayesPatternJsonProtocol extends DefaultJsonProtocol {
  implicit val naiveBayesFormat: RootJsonFormat[NaiveBayesPattern] = jsonFormat2(NaiveBayesPattern)
}
