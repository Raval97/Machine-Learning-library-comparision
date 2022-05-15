package application.dataAnalysis.ml.regression

import application.dataAnalysis.interfaces.ModelPrepare
import org.apache.spark.ml.PipelineStage
import org.apache.spark.ml.regression.LinearRegression
import org.apache.spark.ml.util.MLWritable
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class LinearRegressionPattern(
  regParam: Option[Double] = None,
  fitIntercept: Option[Boolean] = None,
  standardization: Option[Boolean] = None,
  elasticNetParam: Option[Double] = None,
  maxIter: Option[Int] = None,
  tol: Option[Double] = None,
  solver: Option[String] = None,
  aggregationDepth: Option[Int] = None,
  loss: Option[String] = None,
  epsilon: Option[Double] = None
) extends ModelPrepare {
  override def prepareModel: PipelineStage with MLWritable =
    new LinearRegression()
      .setRegParam(regParam.getOrElse(0.0))
      .setFitIntercept(fitIntercept.getOrElse(true))
      .setStandardization(standardization.getOrElse(true))
      .setElasticNetParam(elasticNetParam.getOrElse(0.0))
      .setMaxIter(maxIter.getOrElse(100))
      .setTol(tol.getOrElse(1E-6))
      .setSolver(solver.getOrElse("auto"))
      .setAggregationDepth(aggregationDepth.getOrElse(2))
      .setLoss(loss.getOrElse("squaredError"))
      .setEpsilon(epsilon.getOrElse(1.35))
      .setFeaturesCol("indexedFeatures")
      .setLabelCol("label")
}

trait LinearPatternJsonProtocol extends DefaultJsonProtocol {
  implicit val linearRegFormat: RootJsonFormat[LinearRegressionPattern] = jsonFormat10(LinearRegressionPattern)
}
