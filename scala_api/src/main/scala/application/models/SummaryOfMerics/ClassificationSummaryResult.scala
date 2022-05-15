package application.models.SummaryOfMerics

import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class ClassificationSummaryResult(
  accuracy: Double = 0,
  error: Double = 0,
  precision: Double = 0,
  f1: Double = 0,
  weightedRecall: Double = 0,
  hammingLoss: Double = 0,
)

trait ClassificationSummaryResultJsonProtocol extends DefaultJsonProtocol {
  implicit val classSummaryResultFormat: RootJsonFormat[ClassificationSummaryResult] = jsonFormat6(ClassificationSummaryResult)
}

