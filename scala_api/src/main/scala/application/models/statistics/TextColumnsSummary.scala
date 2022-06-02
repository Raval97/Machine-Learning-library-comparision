package application.models.statistics

import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class TextColumnsSummary(
  name: String,
  count: Long,
  distinct: Long,
  mostCommon: Set[IntStringTuple]
)

trait TextColumnsSummaryJsonProtocol extends DefaultJsonProtocol with IntStringTupleJsonProtocol {
  implicit val TextColumnsSummaryFormat: RootJsonFormat[TextColumnsSummary] = jsonFormat4(TextColumnsSummary)
}


