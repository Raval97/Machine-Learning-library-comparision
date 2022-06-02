package application.dataAnalysis.operations

import application.dataAnalysis.Context.spark
import application.dataAnalysis.operations.Helpers.ReadWriteFiler.safeData
import application.dataAnalysis.operations.Helpers.StatisticsCreator
import application.models.statistics.DataStatistics

object ReadFileOperation extends StatisticsCreator {

  def apply(path: String): DataStatistics = {
    val file = {
      if (path.endsWith(".csv")) {
        spark.read
          .option("inferSchema", "true")
          .option("header", "true")
          .option("sep", ",")
          .csv(path)
          .na.drop()
      } else {
        spark.read
          .option("inferSchema", "true")
          .parquet(path)
      }
    }
    safeData(file)
    createStatisticsSummary(file)
  }

}
