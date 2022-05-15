package application.routes

import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport
import akka.http.scaladsl.model.Multipart
import akka.http.scaladsl.server.Directives.{parameter, _}
import akka.stream.ActorMaterializer
import application.dataAnalysis.Context
import application.dataAnalysis.Context.getFileNamePath
import application.dataAnalysis.operations.{CreateModelOperation, PredictOperation, ReadFileOperation, UpdateDataOperation}
import application.defaultDirectoryPath
import application.models.SummaryOfMerics.SummaryResultJsonProtocol
import application.models._
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
//          complete(output())
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

  def output(): String = {
    """
      |{
      |	"numberColumnsSummary": [
      |		{
      |			"count": 6947,
      |			"max": 41.36,
      |			"mean": 0.392840074852473,
      |			"min": 0,
      |			"name": "NA_Sales",
      |			"percentage25": 0.06,
      |			"percentage50": 0.15,
      |			"percentage75": 0.39,
      |			"stdDev": 0.9611571980788676
      |		},
      |		{
      |			"count": 6947,
      |			"max": 28.96,
      |			"mean": 0.2346480495177644,
      |			"min": 0,
      |			"name": "EU_Sales",
      |			"percentage25": 0.02,
      |			"percentage50": 0.06,
      |			"percentage75": 0.21,
      |			"stdDev": 0.6822932881685936
      |		},
      |		{
      |			"count": 6947,
      |			"max": 6.5,
      |			"mean": 0.06323592917806148,
      |			"min": 0,
      |			"name": "JP_Sales",
      |			"percentage25": 0,
      |			"percentage50": 0,
      |			"percentage75": 0.01,
      |			"stdDev": 0.2852570575341316
      |		},
      |		{
      |			"count": 6947,
      |			"max": 10.57,
      |			"mean": 0.08218943428817449,
      |			"min": 0,
      |			"name": "Other_Sales",
      |			"percentage25": 0.01,
      |			"percentage50": 0.02,
      |			"percentage75": 0.07,
      |			"stdDev": 0.26783226125791154
      |		},
      |		{
      |			"count": 6947,
      |			"max": 82.53,
      |			"mean": 0.7730977400316826,
      |			"min": 0.01,
      |			"name": "Global_Sales",
      |			"percentage25": 0.11,
      |			"percentage50": 0.29,
      |			"percentage75": 0.75,
      |			"stdDev": 1.9488829974139945
      |		},
      |		{
      |			"count": 6947,
      |			"max": 98,
      |			"mean": 70.2635670073413,
      |			"min": 13,
      |			"name": "Critic_Score",
      |			"percentage25": 62,
      |			"percentage50": 72,
      |			"percentage75": 80,
      |			"stdDev": 13.888922232648659
      |		},
      |		{
      |			"count": 6947,
      |			"max": 113,
      |			"mean": 28.87361450986037,
      |			"min": 3,
      |			"name": "Critic_Count",
      |			"percentage25": 14,
      |			"percentage50": 24,
      |			"percentage75": 39,
      |			"stdDev": 19.195731457329906
      |		},
      |		{
      |			"count": 6947,
      |			"max": 10665,
      |			"mean": 173.82136173888009,
      |			"min": 4,
      |			"name": "User_Count",
      |			"percentage25": 11,
      |			"percentage50": 27,
      |			"percentage75": 88,
      |			"stdDev": 584.5118398187244
      |		}
      |	],
      |	{
      |	"textColumnSummary": [
      |		{
      |			"count": 6947,
      |			"distinct": 4420,
      |			"mostCommon": [
      |				{
      |					"count": 0.0012955232474449402,
      |					"name": "Madden NFL 07"
      |				},
      |				{
      |					"count": 0.001151576219951058,
      |					"name": "LEGO Star Wars II: The Original Trilogy"
      |				},
      |				{
      |					"count": 0.001151576219951058,
      |					"name": "Need for Speed: Most Wanted"
      |				}
      |			],
      |			"name": "Name"
      |		},
      |		{
      |			"count": 6947,
      |			"distinct": 17,
      |			"mostCommon": [
      |				{
      |					"count": 0.1671224989203973,
      |					"name": "PS2"
      |				},
      |				{
      |					"count": 0.12624154311213473,
      |					"name": "X360"
      |				},
      |				{
      |					"count": 0.1127105225277098,
      |					"name": "PS3"
      |				}
      |			],
      |			"name": "Platform"
      |		},
      |		{
      |			"count": 6947,
      |			"distinct": 26,
      |			"mostCommon": [
      |				{
      |					"count": 0.08521664027637829,
      |					"name": "2008"
      |				},
      |				{
      |					"count": 0.08492874622139053,
      |					"name": "2007"
      |				},
      |				{
      |					"count": 0.08089822945156183,
      |					"name": "2005"
      |				}
      |			],
      |			"name": "Year_of_Release"
      |		},
      |		{
      |			"count": 6947,
      |			"distinct": 12,
      |			"mostCommon": [
      |				{
      |					"count": 0.23938390672232618,
      |					"name": "Action"
      |				},
      |				{
      |					"count": 0.13890888153159636,
      |					"name": "Sports"
      |				},
      |				{
      |					"count": 0.12696127824960415,
      |					"name": "Shooter"
      |				}
      |			],
      |			"name": "Genre"
      |		},
      |		{
      |			"count": 6947,
      |			"distinct": 264,
      |			"mostCommon": [
      |				{
      |					"count": 0.13761335828415144,
      |					"name": "Electronic Arts"
      |				},
      |				{
      |					"count": 0.07168561969195336,
      |					"name": "Activision"
      |				},
      |				{
      |					"count": 0.07168561969195336,
      |					"name": "Ubisoft"
      |				}
      |			],
      |			"name": "Publisher"
      |		},
      |		{
      |			"count": 6947,
      |			"distinct": 89,
      |			"mostCommon": [
      |				{
      |					"count": 0.042608320138189146,
      |					"name": "7.8"
      |				},
      |				{
      |					"count": 0.03800201525838492,
      |					"name": "8.2"
      |				},
      |				{
      |					"count": 0.03800201525838492,
      |					"name": "8"
      |				}
      |			],
      |			"name": "User_Score"
      |		},
      |		{
      |			"count": 6947,
      |			"distinct": 1297,
      |			"mostCommon": [
      |				{
      |					"count": 0.021879948179070102,
      |					"name": "EA Canada"
      |				},
      |				{
      |					"count": 0.020872318986612928,
      |					"name": "EA Sports"
      |				},
      |				{
      |					"count": 0.01842521951921693,
      |					"name": "Capcom"
      |				}
      |			],
      |			"name": "Developer"
      |		},
      |		{
      |			"count": 6947,
      |			"distinct": 7,
      |			"mostCommon": [
      |				{
      |					"count": 0.34835180653519504,
      |					"name": "T"
      |				},
      |				{
      |					"count": 0.3048798042320426,
      |					"name": "E"
      |				},
      |				{
      |					"count": 0.2100187131135742,
      |					"name": "M"
      |				}
      |			],
      |			"name": "Rating"
      |		}
      |	]
      |}
      |""".stripMargin
  }
}
