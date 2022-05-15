package application.models

import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class PredictParams(
  typeOfProblem: String,
  method: String,
  numberFeatures: Array[Double],
  textFeatures: Array[String],
  numberFeaturesName: Array[String],
  textFeaturesName: Array[String]
) {
  def allFeaturesValues: Array[Any] = {
    numberFeatures ++ textFeatures
  }

  def allFeaturesNames: Array[String] = {
      numberFeaturesName ++ textFeaturesName
  }

  def allFeaturesIndexesNames: Array[String] = {
    val setIndexesName: String => String = name => s"${name}_index"
     numberFeaturesName ++ textFeaturesName.map(setIndexesName)
  }
}

trait PredictParamsJsonProtocol extends DefaultJsonProtocol {
  implicit val predictParamsFormat: RootJsonFormat[PredictParams] = jsonFormat6(PredictParams)
}

