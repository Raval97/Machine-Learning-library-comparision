package application.models

import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class Options(
  typeOfProblem: String,
  method: String,
  trainSize: Double,
  maxCategories: Option[Int] = None,
  standardization: Option[String] = Some("without normalization")
) {

  def division: Array[Double] = Array(trainSize, 1 - trainSize)

}

trait OptionsJsonProtocol extends DefaultJsonProtocol {
  implicit val optionsFormat: RootJsonFormat[Options] = jsonFormat5(Options)
}

