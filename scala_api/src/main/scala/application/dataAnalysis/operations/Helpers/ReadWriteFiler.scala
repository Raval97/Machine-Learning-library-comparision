package application.dataAnalysis.operations.Helpers

import application.dataAnalysis.Context.{getDataFilePath, spark}
import org.apache.spark.sql.DataFrame

object ReadWriteFiler {

  def safeData(data: DataFrame, path: String = getDataFilePath): Unit = {
    data.write.mode("overwrite").save(path)
  }

  def readData(path: String = getDataFilePath): DataFrame = {
    spark.read.load(path)
  }
}
