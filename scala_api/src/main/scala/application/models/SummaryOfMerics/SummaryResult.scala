package application.models.SummaryOfMerics

import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class SummaryResult(
  regressionMetrics: Option[RegressionSummaryResult] = None,
  classificationMetrics: Option[ClassificationSummaryResult] = None,
  prepareDataTime: Float = 0,
  trainingModelTime: Float = 0,
  calculateMetricsTime: Float = 0
)

trait SummaryResultJsonProtocol extends DefaultJsonProtocol
  with ClassificationSummaryResultJsonProtocol
  with RegressionSummaryResultJsonProtocol {
  implicit val summaryResultFormat: RootJsonFormat[SummaryResult] = jsonFormat5(SummaryResult)
}

