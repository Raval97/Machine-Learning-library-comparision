//package application
//
//import application.dataAnalysis.{Classificators, Regressors}
//import application.dataAnalysis.SparkApp.{context, extractData, extractDataAndIndexer}
//import application.models.Context.{pipeline, turnOfLoggingTerminal}
//import application.models.{PredictParams, SummaryResult}
//import org.apache.spark
//import org.apache.spark.ml.Pipeline
//import org.apache.spark.ml.evaluation.{BinaryClassificationEvaluator, MulticlassClassificationEvaluator, RegressionEvaluator}
//import org.apache.spark.ml.feature.{StringIndexer, StringIndexerModel, VectorAssembler}
//import org.apache.spark.sql.{DataFrame, Dataset, Row, SparkSession}
//import org.apache.spark.sql.types.{StringType, StructField}
//
//object test extends App {
//
//  import org.apache.spark.ml.feature.VectorIndexer
//
//  turnOfLoggingTerminal()
//
//  val spark = SparkSession
//    .builder()
//    .appName("NaiveBayesExample")
//    .config("spark.master", "local")
//    .getOrCreate()
//
//  val data = spark.read
//    .option("inferSchema", "true")
//    .option("header", "true")
//    .option("sep", ",")
//    .option("nullValue", "")
//    .csv(pathDirectory + "sample_libsvm_data.txt")
//
//  val indexer = new VectorIndexer()
//    .setInputCol("features")
//    .setOutputCol("indexed")
//    .setMaxCategories(10)
//
//  val indexerModel = indexer.fit(data)
//
//  val categoricalFeatures: Set[Int] = indexerModel.categoryMaps.keys.toSet
//  println(s"Chose ${categoricalFeatures.size} " +
//    s"categorical features: ${categoricalFeatures.mkString(", ")}")
//
//  // Create new column "indexed" with categorical values transformed to indices
//  val indexedData = indexerModel.transform(data)
//  indexedData.show()
//}
//
//class OtherCode {
//  private def stringIndexer(string: String): StringIndexerModel = {
//    new StringIndexer()
//      .setInputCol(string)
//      .setOutputCol(createIndexesName(string))
//      .fit(context)
//  }
//
//  def createIndexesName: String => String = name => s"${name}_index"
//
//  private def extractData: (String, Array[String]) => DataFrame = (label, features) => {
//    val textFeatures: Array[String] = features.filter(parameter => {
//      context.schema.exists((x: StructField) => x.name.equals(parameter) && x.dataType == StringType)
//    })
//    val stages: Array[StringIndexerModel] = textFeatures.map(stringIndexer)
//    val numberFeature: Array[String] = features.filter(f => !textFeatures.contains(f))
//    val newFeatures = numberFeature ++ textFeatures.map(createIndexesName)
//    pipeline.setStages(stages)
//    val model = pipeline.fit(context).transform(context)
//    val assembler = new VectorAssembler()
//      .setInputCols(newFeatures)
//      .setOutputCol("features")
//    model.show()
//    context.show()
//    println(features.mkString(", "))
//    println(textFeatures.mkString(", "))
//    println(numberFeature.mkString(", "))
//    println(newFeatures.mkString(", "))
//    assembler
//      .transform(model)
//      .withColumnRenamed(label, "label")
//      .select("features", "label")
//  }
//
//  private def extractDataAndIndexer(label: String, features: Array[String]): DataFrame = {
//    def setIndexNamed(value: String): String = s"${value}_index"
//
//    def stringToStringIndexer(value: String): StringIndexer = {
//      new StringIndexer().setInputCol(value).setOutputCol(setIndexNamed(value))
//    }
//
//    val assembler = new VectorAssembler()
//    val indexers: Array[StringIndexer] = features.map(stringToStringIndexer) :+ stringToStringIndexer(label)
//    val pipeline = new Pipeline().setStages(indexers)
//    val indexed_df: DataFrame = pipeline.fit(context).transform(context)
//    assembler
//      .setInputCols(features.map(setIndexNamed))
//      .setOutputCol("features")
//      .transform(indexed_df)
//      .withColumnRenamed(setIndexNamed(label), "label")
//      .select("features", "label")
//  }
//
//  def trainTestSplit(
//    label: String,
//    features: Array[String],
//    trainTestDivision: Array[Double],
//    extractorOfData: (String, Array[String]) => DataFrame = extractData
//  ): Array[Dataset[Row]] = {
//    extractorOfData(label, features)
//      .randomSplit(trainTestDivision)
//  }
//
//  def calculateRegressionMetrics(predictions: DataFrame): SummaryResult = {
//    val regressionEvaluatorRmse = new RegressionEvaluator
//    val regressionEvaluatorR2 = new RegressionEvaluator
//    val evaluatorRMSE = regressionEvaluatorRmse
//      .setPredictionCol("prediction")
//      .setMetricName("rmse")
//    val evaluatorR2 = regressionEvaluatorR2
//      .setPredictionCol("prediction")
//      .setMetricName("r2")
//    val rmse = evaluatorRMSE.evaluate(predictions)
//    val r2 = evaluatorR2.evaluate(predictions)
//    SummaryResult(r2, rmse)
//  }
//
//  def calculateClassificationMetrics(predictions: DataFrame): SummaryResult = {
//    val evaluator = new MulticlassClassificationEvaluator()
//      .setLabelCol("label")
//      .setPredictionCol("prediction")
//    val accuracy = evaluator.setMetricName("accuracy").evaluate(predictions)
//    val precision = evaluator.setMetricName("weightedPrecision").evaluate(predictions)
//    val f1 = evaluator.setMetricName("f1").evaluate(predictions)
//    val auc = new BinaryClassificationEvaluator()
//      .setLabelCol("label")
//      .setRawPredictionCol("rawPrediction")
//      .evaluate(predictions)
//    println(s"accuracy  $accuracy")
//    println(s"error  ${1.0 - accuracy}")
//    println(s"precision  $precision")
//    println(s"f1  $f1")
//    println(s"auc  $auc")
//
//    SummaryResult(accuracy, 1.0 - accuracy)
//  }
//
//  def calculateRegression(
//    regresorName: String,
//    train: Dataset[Row],
//    test: Dataset[Row]
//  ): DataFrame = {
//    val regression = Regressors(train, test)
//    regresorName match {
//      case "Linear regression" => regression.linear
//      case "Generalized Linear regression" => regression.generalizedLinear
//      case "Decision tree regression" => regression.decisionTree
//      case "Random forest regression" => regression.randomForrest
//      case _ => regression.randomForrest
//    }
//  }
//
//  def calculateClassification(
//    regresorName: String,
//    assembler: DataFrame,
//    train: Dataset[Row],
//    test: Dataset[Row]
//  ): DataFrame = {
//    val classification = Classificators(assembler, train, test)
//    regresorName match {
//      case "Logistic regression" => classification.logisticRegression
//      case "Decision tree classifier" => classification.decisionTree
//      case "Random forest classifier" => classification.randomForrest
//      case "Naive Bayes" => classification.naiveBayes
//      case _ => classification.naiveBayes
//    }
//  }
//
//  def predict(params: PredictParams): SummaryResult = {
//    params.options.typeOfProblem match {
//      case "Regression" => predictRegression(params)
//      case "Classification" => predictClassification(params)
//      case _ => SummaryResult()
//    }
//  }
//
//  def predictRegression(params: PredictParams): SummaryResult = {
//    val start = System.currentTimeMillis()
//
//    val Array(train, test) = trainTestSplit(params.label, params.features.toArray, params.options.division, extractData)
//    train.show(5);
//    test.show(5)
//
//    val prediction: DataFrame = calculateRegression(params.options.method, train, test)
//    prediction.show(5)
//
//    val result = calculateRegressionMetrics(prediction)
//    println(result.toString)
//
//    result.copy(time = System.currentTimeMillis() - start)
//  }
//
//    def predictClassification(params: PredictParams): SummaryResult = {
//      val start = System.currentTimeMillis()
//
//      val isNaiveBayes = params.options.method.equals("Naive Bayes")
//      val extractor = if (!isNaiveBayes) extractDataAndIndexer(params.label, params.features.toArray) else extractData
//      val assembler = extractData(params.label, params.features.toArray)
//      assembler.show(10)
//      val Array(train, test) = trainTestSplit(params.label, params.features.toArray, params.options.division, extractor)
//      train.show(5);
//      test.show(5)
//
//      val prediction: DataFrame = calculateClassification(
//        params.options.method,
//        assembler,
//        train,
//        test
//      )
//      prediction.show(10)
//
//      val result = calculateClassificationMetrics(prediction)
//      println(result.toString)
//
//      result.copy(time = System.currentTimeMillis() - start)
//    }
//}



// val a: Set[Regressor[linalg.Vector,
//      _ >: LinearRegression with DecisionTreeRegressor,
//      _ >: LinearRegressionModel with DecisionTreeRegressionModel
//    ]] = Set(new LinearRegression(), new DecisionTreeRegressor())
//
//    val c: Regressor[linalg.Vector,
//      _ >: LinearRegression with DecisionTreeRegressor,
//      _ >: LinearRegressionModel with DecisionTreeRegressionModel
//    ] = new LinearRegression()
//
//    val d: RegressorType = new LinearRegression()
//    val d1: Any = d.fit(Context.data)
//
//    val e01: DecisionTreeRegressionModel = ???
//    val e02: LinearRegressionModel = ???
//    val e: Set[RegressionModel[linalg.Vector, _ >: DecisionTreeRegressionModel with LinearRegressionModel <: RegressionModel[linalg.Vector, _ >: DecisionTreeRegressionModel with LinearRegressionModel] with HasWeightCol with MLWritable] with HasWeightCol with MLWritable] = Set(e01, e02)
//
//    val b = Set(new DecisionTreeClassifier(), new LinearRegression())


////    val jsonStr = "{" +"\"metadata\": "+ prepareJson(params) +"}"
//  //    val schema: StructType = spark.read.load(getFeaturesDfFilePath).schema
//    //    val rows: List[Row] = List(params.allFeatures() :+ 1).map{ x => Row(x:_*)}
//    //    val rows: List[Row] = List(Array(1.0,1,1.0) :+ 1).map{ x => Row(x:_*)}
//    //    val rdd = spark.sparkContext.makeRDD(rows)
//    //    val df = spark.sqlContext.createDataFrame(rdd, schema)
//    //    df.show()
//    //    df.schema
//
//    //    val test0 = Context.spark.sqlContext.createDataFrame(Seq(
//    //      (Vectors.dense(params.numberFeatures), 1, params.textFeatures)
//    //    )).toDF("features", "label", "text")
//    //    test0.show()
//    //    test0.printSchema()
//
//    //    val featuresSchema: StructType = spark.read.load(getFeaturesDfFilePath).schema
//    //    //    val test: List[Row] = List(Row.fromSeq(params.allFeatures() :+ 1))
//    //    val test: List[Row] = List(Row.fromSeq(Array(1, 1, 1, 1)))
//    //    val data1: DataFrame = spark.createDataFrame(test, featuresSchema)
//    //
//    //    featuresSchema.printTreeString()
//    //    println(test(0))
//    //    data1.printSchema()
//    //    data1.show()
//
//
//    //    val data3 = new VectorAssembler()
////      .setInputCols(params.allFeatures())
////      .setOutputCol("features")
////      .transform(newData)
////      .withColumnRenamed(label, "label")
//
//    //    val pipelineModel: PipelineModel = PipelineModel.load(getModelFilePath)
//    ////    pipelineModel.stages(2).asInstanceOf()
//    //    val featureIndexer: VectorIndexerModel = VectorIndexerModel.load(getFeatureIndexerFilePath)
//    //    val textFeatureIndexer: StringIndexerModel = StringIndexerModel.load(getFeatureIndexerFilePath)
//    //    val test = Context.spark.sqlContext.createDataFrame(Seq(
//    //      (Vectors.dense(params.numberFeatures), 1)
//    //    )).toDF("features", "label")
//    //    val testIndexer = featureIndexer.transform(test)
//    //    val prediction = pipelineModel.transform(testIndexer)
//    //    prediction.show()
//    //    (prediction.select("prediction").first().get(0), 0.5)


//  def makePrediction(params: PredictParams, indexOfFeatureIndexer: Int, predictionColumn: String): String = {
//    def prepareDataTest(params: PredictParams): DataFrame = {
//      val tuple: Array[(String, Any)] = params.allFeaturesName.zip(params.allFeatures())
//      val jsonStr = JSONObject(tuple.toMap).toString()
//      val rdd = spark.sparkContext.parallelize(Seq(jsonStr))
//      spark.sqlContext.read.json(rdd)
//    }
//
//    def makeIndexingTextFeatures(data: DataFrame): DataFrame = {
//      val textFeatureIndexer: StringIndexerModel = StringIndexerModel.load(getTextFeatureIndexerFilePath)
//      textFeatureIndexer.transform(data)
//    }
//
//    def convertFeaturesAsVector(data: DataFrame, params: PredictParams): DataFrame = {
//      new VectorAssembler()
//        .setInputCols(params.allFeaturesIndexesName)
//        .setOutputCol("features")
//        .transform(data)
//    }
//
//    def makeIndexingVector(data: DataFrame, pipelineModel: PipelineModel, params: PredictParams, index: Int): DataFrame = {
//      val featureIndexer: VectorIndexerModel = pipelineModel.stages(index).asInstanceOf[VectorIndexerModel]
//      new VectorAssembler()
//        .setInputCols(params.allFeaturesIndexesName)
//        .setOutputCol("features")
//        .transform(data)
//      featureIndexer.transform(data3)
//    }
//
//    val pipelineModel: PipelineModel = PipelineModel.load(getModelFilePath)
//    val test = prepareDataTest(params)
//
//    val data2: DataFrame = makeIndexingTextFeatures(test)
//    val data3 = convertFeaturesAsVector(data2, params)
//    val data4: DataFrame = makeIndexingVector(data3, pipelineModel, params, indexOfFeatureIndexer)
//
//    pipelineModel
//      .transform(data4)
//      .select(predictionColumn)
//      .first().get(0).toString
//  }


// val summary = data.summary()
//    val typeOfColumns: Seq[String] = data.schema.map(x => if (x.dataType == StringType) "categorical" else "qualitative")
//    val rowOfType: Seq[Row] = Seq(Row.fromSeq(List("type") ++ typeOfColumns))
//    val dataSetOfRowType = spark.createDataFrame(rowOfType, summary.schema)
//    val result = summary.na.fill(value = "").union(dataSetOfRowType)
//    result.show
//    result

// import scala.collection.JavaConversions._


////  def createUserDirectory(): String = {
////    def getTimeName = {
////      def withZero(nr: Int): String = if (nr < 10) s"0$nr" else nr.toString
////      val cal = Calendar.getInstance()
////      val year = withZero(cal.get(Calendar.YEAR))
////      val month = withZero(cal.get(Calendar.MONTH) + 1)
////      val day = withZero(cal.get(Calendar.DAY_OF_MONTH))
////      val hour = withZero(cal.get(Calendar.HOUR_OF_DAY))
////      val minute = withZero(cal.get(Calendar.MINUTE))
////      val sec = withZero(cal.get(Calendar.SECOND))
////      s"${year}_${month}_${day}_:_${hour}_${minute}_$sec"
////    }
////    val userDirectoryName = s"user_$getTimeName"
////    val folderPath: Path = Paths.get(workspaceDirectoryPath+userDirectoryName)
////    val userDirectoryPath = Files.createDirectories(folderPath)
////    s"$userDirectoryPath/"
////  }
//
////  type RegressorType = RegressionModel[
////    linalg.Vector,
////    _ >: LinearRegressionModel with DecisionTreeRegressionModel with RandomForestRegressionModel with GeneralizedLinearRegressionModel
////  ]
////    Regressor[
////    linalg.Vector,
////    _ >: LinearRegression with DecisionTreeRegressor with RandomForestRegressor with GeneralizedLinearRegression,
////    _ >: LinearRegressionModel with DecisionTreeRegressionModel with RandomForestRegressionModel with GeneralizedLinearRegressionModel
////  ]
//
////  type ClassificatorType =
////    ClassificationModel[
////      linalg.Vector,
////      _ >: DecisionTreeClassificationModel with NaiveBayesModel with LogisticRegressionModel with RandomForestClassificationModel
////    ]
////    Classifier[
////    linalg.Vector,
////    _ >: DecisionTreeClassifier with NaiveBayes  with LogisticRegression with RandomForestClassifier,
////    _ >: DecisionTreeClassificationModel with NaiveBayesModel with LogisticRegressionModel with RandomForestClassificationModel
////  ]
//
////  type MachineLearningType =  RegressorType with ClassificatorType

//  var data: DataFrame = spark.read
//    .option("inferSchema", "true")
//    .option("header", "true")
//    .option("sep", ",")
//    //    .option("nullValue", "")
//    .csv("../data_sets/default/bike_sharing.csv")
//    //    .csv("../data_sets/default/Video_Games_Sales_as_at_22_Dec_2016.csv")
//    .na.drop()
//  private val featureIndexerFileName: String = "featureIndexer"
//  private val featuresDfFileName: String = "featuresSchema"
//  def getFeatureIndexerFilePath = workspaceDirectoryPath + featureIndexerFileName
//  def getFeaturesDfFilePath = workspaceDirectoryPath + featuresDfFileName