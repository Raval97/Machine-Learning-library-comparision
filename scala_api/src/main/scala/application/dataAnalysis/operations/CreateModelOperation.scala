package application.dataAnalysis.operations

import application.dataAnalysis.Context.getTextFeatureIndexerFilePath
import application.dataAnalysis.ml.ClassificatorsAndRegressors
import application.dataAnalysis.operations.Helpers.ReadWriteFiler.readData
import application.dataAnalysis.operations.Helpers.StatisticsCreator
import application.models.MachineLearningModelParams
import application.models.SummaryOfMerics.SummaryResult
import org.apache.spark.ml.feature.{StringIndexer, StringIndexerModel, VectorAssembler}
import org.apache.spark.sql.DataFrame
import org.apache.spark.sql.types.{StringType, StructField}

object CreateModelOperation extends StatisticsCreator {

  def apply(params: MachineLearningModelParams): SummaryResult = {
    println(params)
    val data = readData()
    val start = System.currentTimeMillis()

    val preparedData = extractData(data, params.label, params.features, params.options.method)
    val Array(train, test) = preparedData.randomSplit(params.options.division)
    train.show(5)
    test.show(5)
    train.printSchema()

    val mlModel= new ClassificatorsAndRegressors(preparedData, train, test)
      .chooseTypeOfProblem(params.options.typeOfProblem)

    val prediction = mlModel
      .predicate(params.options.method, params.hyperparameters)
    prediction.show(5)

    val result = mlModel.calculateMetrics(prediction)
    println(result.toString)

    result.copy(time = System.currentTimeMillis() - start)
  }

  private def extractData(data: DataFrame, label: String, features: Array[String], problemName: String): DataFrame = {
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
    textFeaturesIndexer.write.overwrite().save(getTextFeatureIndexerFilePath)
    val newData: DataFrame = textFeaturesIndexer.transform(data)
    new VectorAssembler()
      .setInputCols(newFeatures)
      .setOutputCol("features")
      .transform(newData)
      .withColumnRenamed(label, "label")
      .select("features", "label")
  }

}
