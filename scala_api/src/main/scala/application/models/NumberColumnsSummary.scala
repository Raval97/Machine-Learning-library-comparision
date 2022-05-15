package application.models

import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class NumberColumnsSummary(
  name: String,
  count: Long,
  mean: Double,
  stdDev: Double,
  min: Double,
  percentage25: Double,
  percentage50: Double,
  percentage75: Double,
  max: Double
)

trait NumberColumnsSummaryJsonProtocol extends DefaultJsonProtocol {
  implicit val numberColumnsSummaryFormat: RootJsonFormat[NumberColumnsSummary] = jsonFormat9(NumberColumnsSummary)
}