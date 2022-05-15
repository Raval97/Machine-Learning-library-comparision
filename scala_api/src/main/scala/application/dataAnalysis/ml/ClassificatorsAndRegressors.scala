package application.dataAnalysis.ml

import application.dataAnalysis.Context._
import application.dataAnalysis.interfaces.ModelCreateProcess
import application.dataAnalysis.ml.classification.Classificators
import application.dataAnalysis.ml.regression.Regressors
import org.apache.spark.ml.feature.{VectorIndexer, VectorIndexerModel}
import org.apache.spark.ml.{Pipeline, PipelineModel}
import org.apache.spark.sql.{DataFrame, Dataset, Row}


class ClassificatorsAndRegressors(
  val data: DataFrame,
  val train: Dataset[Row],
  val test: Dataset[Row],
  val maxCategories: Option[Int] = None
) {

  val pipeline = new Pipeline()

  def chooseTypeOfProblem(typeOfProblem: String): ClassificatorsAndRegressors with ModelCreateProcess = {
    typeOfProblem match {
      case "Regression" => Regressors(data, train, test)
      case _ => Classificators(data, train, test)
    }
  }

  val featureIndexer: VectorIndexerModel = {
    new VectorIndexer()
      .setInputCol("features")
      .setOutputCol("indexedFeatures")
      .setMaxCategories(maxCategories.getOrElse(4))
      .fit(data)
  }

  def safeResources(pipelineModel: PipelineModel): Unit = {
    pipelineModel.write.overwrite().save(getModelFilePath)
  }
}