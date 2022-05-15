package application.dataAnalysis.ml.regression

import application.dataAnalysis.interfaces.ModelPrepare
import org.apache.spark.ml.PipelineStage
import org.apache.spark.ml.regression.GeneralizedLinearRegression
import org.apache.spark.ml.util.MLWritable
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class GeneralizedLinearRegressionPattern(
  family: Option[String] = None,
  variancePower: Option[Double] = None,
  maxIter: Option[Int] = None,
  regParam: Option[Double] = None,
  tol: Option[Double] = None,
  solver: Option[String] = None,
  fitIntercept: Option[Boolean] = None,
  aggregationDepth: Option[Int] = None,
) extends ModelPrepare {
  override def prepareModel: PipelineStage with MLWritable =
    new GeneralizedLinearRegression()
      .setFamily(family.getOrElse("gaussian"))
      .setVariancePower(variancePower.getOrElse(0.0))
      .setMaxIter(maxIter.getOrElse(25))
      .setRegParam(regParam.getOrElse(0.0))
      .setTol(tol.getOrElse(1E-6))
      .setSolver(solver.getOrElse("irls"))
      .setFitIntercept(fitIntercept.getOrElse(true))
      .setAggregationDepth(aggregationDepth.getOrElse(2))
      .setFeaturesCol("indexedFeatures")
      .setLabelCol("label")
}

trait GeneralizedLinearPatternJsonProtocol extends DefaultJsonProtocol {
  implicit val generalizedLinearRegFormat: RootJsonFormat[GeneralizedLinearRegressionPattern] =
    jsonFormat8(GeneralizedLinearRegressionPattern)
}
