package application.routes

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.Multipart
import akka.http.scaladsl.server.Directives.{parameter, _}
import akka.stream.ActorMaterializer
import application.dataAnalysis.Context.getFileNamePath
import application.dataAnalysis.operations.{CreateModelOperation, PredictOperation, ReadFileOperation, UpdateDataOperation}
import application.defaultDirectoryPath
import application.models.SummaryOfMerics.SummaryResultJsonProtocol
import application.models._
import application.models.statistics.DataStatisticsJsonProtocol
import ch.megard.akka.http.cors.scaladsl.CorsDirectives.cors

import scala.concurrent.Future
import scala.util.{Failure, Success}

object Router extends SprayJsonSupport
  with SummaryResultJsonProtocol
  with MlModelParamsJsonProtocol
  with PredictParamsJsonProtocol
  with DataStatisticsJsonProtocol {

  implicit val system = ActorSystem()
  implicit val materializer = ActorMaterializer()

  private val route =
    cors() {
      (path("upload") & extractLog) { log =>
        entity(as[Multipart.FormData]) { formData =>
        onComplete(UploadFileOperation(log, formData)) {
            case Success(_) =>
              log.info(s"Read file and make statistics")
              complete(ReadFileOperation(getFileNamePath))
            case Failure(ex) => complete(s"File failed to upload: $ex")
          }
        }
      }
    } ~ cors() {
      path("load") {
        (parameter('param) & extractLog) {(fileName: String, log) => {
          log.info(s"Load file: $fileName   and make statistics")
          complete(ReadFileOperation(defaultDirectoryPath + fileName))
        }
        }
      }
    } ~ cors() {
      (path("createModel") & extractLog) { log =>
        entity(as[MachineLearningModelParams]) { params: MachineLearningModelParams =>
          log.info(s"Create Machine Learning Model for parameters: \n${params}")
          complete(CreateModelOperation(params))
        }
      }
    } ~ cors() {
      (path("predict") & extractLog) { log =>
        entity(as[PredictParams]) { params: PredictParams =>
          log.info(s"Make prediction for parameters: \n${params}")
          complete(PredictOperation(params))
        }
      }
    } ~ cors() {
      path("castToInt") {
        (parameter('param) & extractLog) {(params, log) => {
            log.info(s"Cast String column to Integer column for params: \n${params}")
            complete(UpdateDataOperation(params))
          }
        }
      }
    }

  def init: Future[Http.ServerBinding] = Http().newServerAt("localhost", 8080).bindFlow(route)
}
