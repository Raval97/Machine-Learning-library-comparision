package application.dataAnalysis.operations

import application.dataAnalysis.Context.{getModelFilePath, getTextFeatureIndexerFilePath, spark}
import application.dataAnalysis.ml.classification.Classificators
import application.dataAnalysis.ml.regression.Regressors
import application.models.PredictParams
import org.apache.spark.ml.PipelineModel
import org.apache.spark.ml.feature.{StringIndexerModel, VectorAssembler, VectorIndexerModel}
import org.apache.spark.sql.DataFrame

import scala.util.parsing.json.JSONObject

object PredictOperation {

  def apply(params: PredictParams): String = {
    params.typeOfProblem match {
      case "Regression" => makePredict(params, Regressors.indexOfFeatureIndexer, Regressors.predictionColumn)
      case _ => makePredict(params, Classificators.indexOfFeatureIndexer, Classificators.predictionColumn)
    }
  }

  private def prepareDataTest(params: PredictParams): DataFrame = {
    val tuple: Array[(String, Any)] = params.allFeaturesNames.zip(params.allFeaturesValues)
    val jsonStr = JSONObject(tuple.toMap).toString()
    val rdd = spark.sparkContext.parallelize(Seq(jsonStr))
    spark.sqlContext.read.json(rdd)
  }

  private def makePredict(params: PredictParams, index: Int, predictColumn: String): String = {
    val pipelineModel: PipelineModel = PipelineModel.load(getModelFilePath)
    val textFeatureIndexer: StringIndexerModel = StringIndexerModel.load(getTextFeatureIndexerFilePath)
    val featureIndexer: VectorIndexerModel = pipelineModel.stages(index).asInstanceOf[VectorIndexerModel]
    val test = prepareDataTest(params)

    val data2: DataFrame = textFeatureIndexer.transform(test)
    val data3 = new VectorAssembler()
      .setInputCols(params.allFeaturesIndexesNames)
      .setOutputCol("features")
      .transform(data2)
    val data4: DataFrame = featureIndexer.transform(data3)
    pipelineModel
      .transform(data4)
      .select(predictColumn)
      .first().get(0).toString
  }
}
