package application.models.SummaryOfMerics

import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class SummaryResult(
  regressionMetrics: Option[RegressionSummaryResult] = None,
  classificationMetrics: Option[ClassificationSummaryResult] = None,
  time: Float = 0
)

trait SummaryResultJsonProtocol extends DefaultJsonProtocol
  with ClassificationSummaryResultJsonProtocol
  with RegressionSummaryResultJsonProtocol {
  implicit val summaryResultFormat: RootJsonFormat[SummaryResult] = jsonFormat3(SummaryResult)
}

