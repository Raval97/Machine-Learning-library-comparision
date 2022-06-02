package application.models.statistics

import spray.json.{DefaultJsonProtocol, RootJsonFormat}

case class IntStringTuple(
  count: Double,
  name: String
)

trait IntStringTupleJsonProtocol extends DefaultJsonProtocol {
  implicit val intStringTupleFormat: RootJsonFormat[IntStringTuple] = jsonFormat2(IntStringTuple)
}
