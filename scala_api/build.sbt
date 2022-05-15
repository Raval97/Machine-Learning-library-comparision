ThisBuild / version := "0.1.0-SNAPSHOT"

scalaVersion := "2.12.10"

val sparkVersion = "3.0.2"
val vegasVersion = "0.3.11"
val postgresVersion = "42.2.2"
val akkaVersion = "2.6.19"
val akkaHttpVersion = "10.2.7"
val akkaHttpCors = "1.1.3"
val scalaTestVersion = "3.0.5"

resolvers ++= Seq(
  "bintray-spark-packages" at "https://dl.bintray.com/spark-packages/maven",
  "Typesafe Simple Repository" at "https://repo.typesafe.com/typesafe/simple/maven-releases",
  "MavenRepository" at "https://mvnrepository.com"
)


libraryDependencies ++= Seq(
  // spark
  "org.apache.spark" %% "spark-core" % sparkVersion,
  "org.apache.spark" %% "spark-sql" % sparkVersion,
  "org.apache.spark" %% "spark-mllib" % sparkVersion,
  // logging
  "org.apache.logging.log4j" % "log4j-api" % "2.4.1",
  "org.apache.logging.log4j" % "log4j-core" % "2.4.1",
  // akka streams
  "com.typesafe.akka" %% "akka-stream" % akkaVersion,
  // akka http
  "com.typesafe.akka" %% "akka-http" % akkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-spray-json" % akkaHttpVersion,
  "com.typesafe.akka" %% "akka-http-testkit" % akkaHttpVersion,
  "ch.megard" %% "akka-http-cors" % akkaHttpCors,
  // testing
  "com.typesafe.akka" %% "akka-testkit" % akkaVersion,
  "org.scalatest" %% "scalatest" % scalaTestVersion,
// JWT
  "com.pauldijou" %% "jwt-spray-json" % "2.1.0"
)
