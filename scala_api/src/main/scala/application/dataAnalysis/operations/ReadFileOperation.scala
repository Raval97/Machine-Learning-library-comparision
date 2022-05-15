package application.dataAnalysis.operations

import application.dataAnalysis.Context.spark
import application.dataAnalysis.operations.Helpers.ReadWriteFiler.safeData
import application.dataAnalysis.operations.Helpers.StatisticsCreator
import application.models.DataStatistics

object ReadFileOperation extends StatisticsCreator{

  def apply(path: String): DataStatistics = {
    val file = spark.read
      .option("inferSchema", "true")
      .option("header", "true")
      .option("sep", ",")
      .csv(path)
      .na.drop()
    safeData(file)
    createStatisticsSummary(file)
  }

}
