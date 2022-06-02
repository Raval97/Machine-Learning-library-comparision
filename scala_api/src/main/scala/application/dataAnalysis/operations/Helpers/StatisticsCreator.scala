package application.dataAnalysis.operations.Helpers

import application.models.statistics.{DataStatistics, IntStringTuple, NumberColumnsSummary, TextColumnsSummary}
import org.apache.spark.sql.{DataFrame, Row}
import org.apache.spark.sql.functions.col
import org.apache.spark.sql.types.{StringType, TimestampType}

class StatisticsCreator {

  def createStatisticsSummary(data: DataFrame): DataStatistics = {
    DataStatistics(textColumnsSummary(data), numberColumnsSummary(data))
  }

  private def textColumnsSummary(data: DataFrame): Seq[TextColumnsSummary] = {
    val textColumnNames: Seq[String] = data.schema.filter(
      x => x.dataType == StringType || x.dataType == TimestampType
    ).map(_.name)
    val textColumn = data.select(textColumnNames.map(col): _*)
    textColumnNames.map(name => {
      val rdd = textColumn.select(name).rdd
      val distinct = rdd.distinct().count()
      val allCount = rdd.count()
      val mostCommons = rdd.map(s => (s, 1))
        .reduceByKey(_ + _)
        .map { case (s, count) => (count, s) }
        .top(3)(Ordering.by(_._1))
        .map { case (count, s) => IntStringTuple(count.toDouble / allCount, s.get(0).toString)}
      TextColumnsSummary(name, allCount, distinct, mostCommons.toSet)
    })
  }

  private def numberColumnsSummary(data: DataFrame): Seq[NumberColumnsSummary] = {
    val numberColumnNames: Seq[String] = data.schema.filter(x => x.dataType != StringType).map(_.name)
    val numberColumn = data.select(numberColumnNames.map(col): _*)
    val summary = numberColumn.summary()
    numberColumnNames.map { name =>
      val rdd: Array[Row] = summary.select(col(name)).rdd.take(8)
      NumberColumnsSummary(
        name = name,
        count = rdd(0).get(0).toString.toDouble.toLong,
        mean = rdd(1).get(0).toString.toDouble,
        stdDev = rdd(2).get(0).toString.toDouble,
        min = rdd(3).get(0).toString.toDouble,
        percentage25 = rdd(4).get(0).toString.toDouble,
        percentage50 = rdd(5).get(0).toString.toDouble,
        percentage75 = rdd(6).get(0).toString.toDouble,
        max = rdd(7).get(0).toString.toDouble
      )
    }
  }
}
