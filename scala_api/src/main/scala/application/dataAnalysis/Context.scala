package application.dataAnalysis

import application.workspaceDirectoryPath
import org.apache.spark.sql.SparkSession

case object Context {

  val spark: SparkSession = SparkSession.builder()
    .appName("App")
    .config("spark.master", "local")
    .getOrCreate()

  def turnOfLoggingTerminal(): Unit = {
    import org.apache.log4j.{Level, Logger}
    val rootLogger = Logger.getRootLogger
    rootLogger.setLevel(Level.ERROR)
    Logger.getLogger("org.apache.spark").setLevel(Level.ERROR)
    Logger.getLogger("org.spark-project").setLevel(Level.ERROR)
  }

  turnOfLoggingTerminal()

  private val fileName: String = "dataSet.csv"
  private val dataFrameFileName: String = "dataFrame"
  private val modelFileName: String = "pipelineModel"
  private val textFeatureIndexerFileName: String = "textFeatureIndexer"

  val saveModels = true

  def getFileNamePath = workspaceDirectoryPath + fileName

  def getModelFilePath = workspaceDirectoryPath + modelFileName

  def getDataFilePath = workspaceDirectoryPath + dataFrameFileName

  def getTextFeatureIndexerFilePath = workspaceDirectoryPath + textFeatureIndexerFileName

}
