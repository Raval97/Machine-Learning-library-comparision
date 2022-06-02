package application.dataAnalysis.operations

import application.dataAnalysis.Context.getDataFilePath
import application.dataAnalysis.operations.Helpers.ReadWriteFiler.{readData, safeData}
import application.dataAnalysis.operations.Helpers.StatisticsCreator
import application.models.statistics.DataStatistics
import org.apache.spark.sql.functions.col
import org.apache.spark.sql.types.IntegerType
import org.sparkproject.guava.io.Files

import java.io.File
import scala.reflect.io.Directory

object UpdateDataOperation extends StatisticsCreator {

  def apply(parameter: String): DataStatistics = {
    val data = readData()
    val newData = data.withColumn(parameter, col(parameter).cast(IntegerType)).na.drop()
    safeData(newData, path = getDataFilePath + '2')
    val summary = createStatisticsSummary(newData)

    val directory = new Directory(new File(getDataFilePath))
    directory.deleteRecursively()
    Files.move(new File(getDataFilePath+'2'), new File(getDataFilePath))
    summary
  }
}
