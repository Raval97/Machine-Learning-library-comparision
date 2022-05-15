package application.models

import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class DataStatistics(
  textColumnSummary: Seq[TextColumnsSummary],
  numberColumnsSummary: Seq[NumberColumnsSummary]
)

trait DataStatisticsJsonProtocol extends DefaultJsonProtocol
  with TextColumnsSummaryJsonProtocol
  with NumberColumnsSummaryJsonProtocol {
  implicit val dataStatisticsFormat: RootJsonFormat[DataStatistics] = jsonFormat2(DataStatistics)
}
