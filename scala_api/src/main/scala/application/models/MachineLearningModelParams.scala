package application.models

import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class MachineLearningModelParams(
  label: String,
  features: Array[String],
  options: Options,
  hyperparameters: Hyperparameters
)

trait MlModelParamsJsonProtocol extends DefaultJsonProtocol with OptionsJsonProtocol with MLModelCreatorJsonProtocol {
  implicit val mlModelParamsFormat: RootJsonFormat[MachineLearningModelParams] = jsonFormat4(MachineLearningModelParams)
}

