package application.dataAnalysis.interfaces

import application.models.Hyperparameters
import application.models.SummaryOfMerics.SummaryResult
import org.apache.spark.ml.PipelineStage
import org.apache.spark.ml.util.MLWritable
import org.apache.spark.sql.DataFrame

trait ModelCreateProcess {

  def chooseAndCreateModel(hyperparameters: Hyperparameters, methodName: String): ModelPrepare

  def makeFitAndTransform(machineLearningModel: PipelineStage with MLWritable): DataFrame

  def calculateMetrics(predictions: DataFrame): SummaryResult

  def predicate(methodName: String, hyperparameters: Hyperparameters): DataFrame =
    makeFitAndTransform(
      machineLearningModel = chooseAndCreateModel(hyperparameters, methodName).prepareModel
    )
}
