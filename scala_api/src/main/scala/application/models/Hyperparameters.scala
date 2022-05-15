package application.models

import application.dataAnalysis.ml.classification._
import application.dataAnalysis.ml.regression._
import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class Hyperparameters(
  linearRegressionModel: Option[LinearRegressionPattern] = None,
  generalizedLinearRegressionModel: Option[GeneralizedLinearRegressionPattern] = None,
  decisionTreeRegModel: Option[DecisionTreeRegPattern] = None,
  randomForrestRegModel: Option[RandomForrestRegPattern] = None,
  logisticRegressionModel: Option[LogisticRegressionPattern] = None,
  naiveBayesModel: Option[NaiveBayesPattern] = None,
  decisionTreeClassModel: Option[DecisionTreeClassPattern] = None,
  randomForrestClassModel: Option[RandomForrestClassPattern] = None
)

trait MLModelCreatorJsonProtocol extends DefaultJsonProtocol
  with LinearPatternJsonProtocol
  with GeneralizedLinearPatternJsonProtocol
  with DecisionTreeRegPatternJsonProtocol
  with RandomForrestRegPatternJsonProtocol
  with LogisticRegressionPatternJsonProtocol
  with NaiveBayesPatternJsonProtocol
  with DecisionTreeClassPatternJsonProtocol
  with RandomForrestClassPatternJsonProtocol {
  implicit val hyperparametersFormat: RootJsonFormat[Hyperparameters] = jsonFormat8(Hyperparameters)
}
