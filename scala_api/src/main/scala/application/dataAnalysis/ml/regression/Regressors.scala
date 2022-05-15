package application.dataAnalysis.ml.regression

import application.dataAnalysis.interfaces.{ModelCreateProcess, ModelPrepare}
import application.dataAnalysis.ml.ClassificatorsAndRegressors
import application.models.Hyperparameters
import application.models.SummaryOfMerics.{RegressionSummaryResult, SummaryResult}
import org.apache.spark.ml.evaluation.RegressionEvaluator
import org.apache.spark.ml.util.MLWritable
import org.apache.spark.ml.{PipelineModel, PipelineStage}
import org.apache.spark.sql.{DataFrame, Dataset, Row}

case class Regressors(
 override val data: DataFrame,
 override val train: Dataset[Row],
 override val test: Dataset[Row],
 override val maxCategories: Option[Int] = None
) extends ClassificatorsAndRegressors(data, train, test, maxCategories) with ModelCreateProcess {

  override def makeFitAndTransform(regressionModel: PipelineStage with MLWritable): DataFrame = {
    pipeline.setStages(Array(featureIndexer, regressionModel))
    val model: PipelineModel = pipeline.fit(train)
    val predictions: DataFrame = model.transform(test)
    safeResources(model)
    predictions
  }

  override def chooseAndCreateModel(hyperparameters: Hyperparameters, methodName: String): ModelPrepare = {
    methodName match {
      case "Linear regression" => hyperparameters.linearRegressionModel.getOrElse(LinearRegressionPattern())
      case "Generalized Linear regression" => hyperparameters.generalizedLinearRegressionModel.getOrElse(GeneralizedLinearRegressionPattern())
      case "Decision tree regression" => hyperparameters.decisionTreeRegModel.getOrElse(DecisionTreeRegPattern())
      case "Random forest regression" => hyperparameters.randomForrestRegModel.getOrElse(RandomForrestRegPattern())
      case _ => hyperparameters.linearRegressionModel.getOrElse(LinearRegressionPattern())
    }
  }

  override def calculateMetrics(predictions: DataFrame): SummaryResult =  {
    val regressionEvaluatorRmse = new RegressionEvaluator
    val regressionEvaluatorR2 = new RegressionEvaluator
    val evaluatorRMSE = regressionEvaluatorRmse
      .setPredictionCol("prediction")
      .setMetricName("rmse")
    val evaluatorR2 = regressionEvaluatorR2
      .setPredictionCol("prediction")
      .setMetricName("r2")
    val rmse = evaluatorRMSE.evaluate(predictions)
    val r2 = evaluatorR2.evaluate(predictions)
    val metrics = RegressionSummaryResult(r2, rmse)
    SummaryResult(regressionMetrics = Some(metrics))
  }

}

object Regressors{
  val indexOfFeatureIndexer: Int = 0
  val predictionColumn = "prediction"
}
