package application.dataAnalysis.operations

import application.dataAnalysis.Context
import application.dataAnalysis.Context.getTextFeatureIndexerFilePath
import application.dataAnalysis.ml.ClassificatorsAndRegressors
import application.dataAnalysis.operations.Helpers.ReadWriteFiler.readData
import application.dataAnalysis.operations.Helpers.StatisticsCreator
import application.models.MachineLearningModelParams
import application.models.SummaryOfMerics.SummaryResult
import org.apache.spark.ml.feature._
import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.types.{StringType, StructField}

object CreateModelOperation extends StatisticsCreator {

  def apply(params: MachineLearningModelParams): SummaryResult = {
    val data = readData()
    val start = System.currentTimeMillis()

    val preparedData = extractData(data, params.label, params.features, params.options.standardization.get)
    val Array(train, test) = preparedData.randomSplit(params.options.division)
    val prepareDataTime = System.currentTimeMillis() - start

    val mlModel= new ClassificatorsAndRegressors(preparedData, train, test)
      .chooseTypeOfProblem(params.options.typeOfProblem)

    val prediction = mlModel
      .predicate(params.options.method, params.hyperparameters)
    val trainingModelTime = System.currentTimeMillis() - start - prepareDataTime

    val result = mlModel.calculateMetrics(prediction)
    val calculateMetricsTime = System.currentTimeMillis() - start - trainingModelTime - prepareDataTime

    result.copy(
      prepareDataTime = prepareDataTime.toFloat / 1000,
      trainingModelTime = trainingModelTime.toFloat / 1000,
      calculateMetricsTime= calculateMetricsTime.toFloat / 1000
    )
  }

  private def extractData(data: DataFrame, label: String, features: Array[String], standardization: String): DataFrame = {
    val setIndexesName: String => String = name => s"${name}_index"

    val textFeatures: Array[String] = features.filter(parameter => {
        data.schema.exists((x: StructField) => x.name.equals(parameter) && x.dataType == StringType)
    })
    val newNameOfTextFeatures = textFeatures.map(setIndexesName)
    val numberFeature: Array[String] = features.filter(f => !textFeatures.contains(f))
    val newFeatures = numberFeature ++ newNameOfTextFeatures

    val textFeaturesIndexer: StringIndexerModel = new StringIndexer()
      .setInputCols(textFeatures)
      .setOutputCols(newNameOfTextFeatures)
      .fit(data)
    if (Context.saveModels)
      textFeaturesIndexer.write.overwrite().save(getTextFeatureIndexerFilePath)
    val newData: DataFrame = textFeaturesIndexer.transform(data)
    val vector = new VectorAssembler()
      .setInputCols(newFeatures)
      .setOutputCol("nonScaledFeatures")
      .transform(newData)
      .withColumnRenamed(label, "label")
      .select("nonScaledFeatures", "label")
    if (standardization == "MinMaxScaler") {
      new MinMaxScaler()
        .setInputCol("nonScaledFeatures")
        .setOutputCol("features")
        .fit(vector)
        .transform(vector)
        .select("features", "label")
    }
    else if (standardization == "StandardScaler") {
        new StandardScaler()
          .setWithStd(true)
          .setWithMean(true)
          .setInputCol("nonScaledFeatures")
          .setOutputCol("features")
          .fit(vector)
          .transform(vector)
          .select("features", "label")
    }
    else
      vector.withColumnRenamed("nonScaledFeatures", "features")
  }

}
