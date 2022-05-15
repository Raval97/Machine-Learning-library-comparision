package application.dataAnalysis.ml.classification

import application.dataAnalysis.interfaces.{ModelCreateProcess, ModelPrepare}
import application.dataAnalysis.ml.ClassificatorsAndRegressors
import application.models.Hyperparameters
import application.models.SummaryOfMerics.{ClassificationSummaryResult, SummaryResult}
import org.apache.spark.ml.PipelineStage
import org.apache.spark.ml.evaluation.{BinaryClassificationEvaluator, MulticlassClassificationEvaluator}
import org.apache.spark.ml.feature._
import org.apache.spark.ml.util.MLWritable
import org.apache.spark.sql.{DataFrame, Dataset, Row}

case class Classificators(
 override val data: DataFrame,
 override val train: Dataset[Row],
 override val test: Dataset[Row],
 override val maxCategories: Option[Int] = None
) extends ClassificatorsAndRegressors(data, train, test, maxCategories) with ModelCreateProcess {

  override def makeFitAndTransform(classificationModel: PipelineStage with MLWritable): DataFrame = {
    pipeline.setStages(Array(labelIndexer, featureIndexer, classificationModel, labelConverter))
    val model = pipeline.fit(train) // requirement failed: DecisionTree requires maxBins (= 32) to be at least as large as the number of values in each categorical feature
    val predictions: DataFrame = model.transform(test)
    safeResources(model)
    predictions
  }

  override def chooseAndCreateModel(hyperparameters: Hyperparameters, methodName: String): ModelPrepare = {
    methodName match {
      case "Logistic regression" => hyperparameters.logisticRegressionModel.getOrElse(LogisticRegressionPattern())
      case "Decision tree classifier" => hyperparameters.decisionTreeClassModel.getOrElse(DecisionTreeClassPattern())
      case "Random forest classifier" => hyperparameters.randomForrestClassModel.getOrElse(RandomForrestClassPattern())
      case "Naive Bayes" => hyperparameters.naiveBayesModel.getOrElse(LogisticRegressionPattern())
      case _ => hyperparameters.logisticRegressionModel.getOrElse(LogisticRegressionPattern())
    }
  }

  override def calculateMetrics(predictions: DataFrame): SummaryResult = {
    val evaluator = new MulticlassClassificationEvaluator()
      .setLabelCol("indexedLabel")
      .setPredictionCol("prediction")
    val accuracy = evaluator.setMetricName("accuracy").evaluate(predictions)
    val precision = evaluator.setMetricName("weightedPrecision").evaluate(predictions)
    val f1 = evaluator.setMetricName("f1").evaluate(predictions)
    val weightedRecall = evaluator.setMetricName("weightedRecall").evaluate(predictions)
    val hammingLoss = evaluator.setMetricName("hammingLoss").evaluate(predictions)
    println(s"accuracy  $accuracy")
    println(s"error  ${1.0 - accuracy}")
    println(s"precision  $precision")
    println(s"f1  $f1")
    println(s"weightedRecall  $weightedRecall")
    println(s"falsePositive  $hammingLoss")

    val metrics = ClassificationSummaryResult(accuracy, 1.0 - accuracy, precision, f1, weightedRecall, hammingLoss)
    SummaryResult(classificationMetrics = Some(metrics))
  }

  private def labelIndexer: StringIndexerModel = {
    new StringIndexer()
      .setInputCol("label")
      .setOutputCol("indexedLabel")
      .fit(data)
  }

  private def labelConverter: IndexToString = {
    new IndexToString()
      .setInputCol("prediction")
      .setOutputCol("predictedLabel")
      .setLabels(labelIndexer.labelsArray(0))
  }

}

object Classificators {
  val indexOfFeatureIndexer: Int = 1
  val predictionColumn = "predictedLabel"
}