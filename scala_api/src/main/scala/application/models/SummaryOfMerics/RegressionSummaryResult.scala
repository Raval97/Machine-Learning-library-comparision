package application.models.SummaryOfMerics

import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class RegressionSummaryResult(
  r2: Double = 0,
  rmse: Double = 0,
)

trait RegressionSummaryResultJsonProtocol extends DefaultJsonProtocol {
  implicit val regSummaryResultFormat: RootJsonFormat[RegressionSummaryResult] = jsonFormat2(RegressionSummaryResult)
}

