package other

import org.apache.spark.sql.{Dataset, Row}

import scala.util.parsing.json.{JSON, JSONArray, JSONFormat, JSONObject}

//noinspection ScalaDeprecation
object JsonUtils {

  def format(t: Any, i: Int = 0): String = t match {
    case o: JSONObject =>
      o.obj.map { case (k, v) =>
        "  " * (i + 1) + JSONFormat.defaultFormatter(k) + ": " + format(v, i + 1)
      }.mkString("{\n", ",\n", "\n" + "  " * i + "}")

    case a: JSONArray =>
      a.list.map {
        e => "  " * (i + 1) + format(e, i + 1)
      }.mkString("[\n", ",\n", "\n" + "  " * i + "]")

    case _ => JSONFormat defaultFormatter t
  }

  implicit class DataSetParser(dataSet: Dataset[Row]) {
    def toJson: String = {
      val jsonString = dataSet
        .toJSON
        .collect()
        .map(j => format(JSON.parseRaw(j).get))
        .toList
        .mkString(",")
      "[" + jsonString + "]"
    }
  }
}
