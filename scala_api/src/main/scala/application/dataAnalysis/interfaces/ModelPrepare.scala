package application.dataAnalysis.interfaces

import org.apache.spark.ml.PipelineStage
import org.apache.spark.ml.util.MLWritable

trait ModelPrepare {
  def prepareModel: PipelineStage with MLWritable
}
