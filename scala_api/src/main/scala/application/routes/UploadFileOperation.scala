package application.routes

import akka.Done
import akka.event.LoggingAdapter
import akka.http.scaladsl.model.Multipart
import akka.stream.scaladsl.{FileIO, Sink, Source}
import application.dataAnalysis.Context.getFileNamePath
import application.routes.Router.materializer

import java.io.File
import scala.concurrent.Future

object UploadFileOperation {

  def apply(log: LoggingAdapter, formData: Multipart.FormData): Future[Done] = {
    val partsSource: Source[Multipart.FormData.BodyPart, Any] = formData.parts
    val filePartsSink: Sink[Multipart.FormData.BodyPart, Future[Done]] = Sink.foreach[Multipart.FormData.BodyPart] { bodyPart =>
      if (bodyPart.name == "myFile") {
        val file = new File(getFileNamePath)
        log.info(s"Writing to file: $getFileNamePath")
        val fileContentsSource = bodyPart.entity.dataBytes
        val fileContentsSink = FileIO.toPath(file.toPath)
        fileContentsSource.runWith(fileContentsSink)
      }
    }
    partsSource.runWith(filePartsSink)
  }
}

