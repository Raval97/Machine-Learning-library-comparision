from pyspark.ml.feature import Imputer, StringIndexer, IndexToString
from pyspark.sql import SparkSession
from pyspark.sql.functions import *

from pyspark.sql.types import StringType

if __name__ == '__main__':
    spark = SparkSession.builder.appName('app').getOrCreate()

    directoryFrom = "../data_sets/default/original_taxi/"
    directoryTo = "../data_sets/default/"
    filename = "yellow_tripdata_2021-03.parquet"

    file = spark.read \
        .option("inferSchema", "true") \
        .parquet(directoryFrom + filename)

    stringToInt1 = StringIndexer(
        inputCol= "store_and_fwd_flag",
        outputCol="i_store_and_fwd_flag"
    ).setHandleInvalid("skip").fit(file)
    file = stringToInt1.transform(file)
    file = file.drop(file["store_and_fwd_flag"])
    file = file.drop(file["tpep_pickup_datetime"])
    file = file.drop(file["tpep_dropoff_datetime"])
    file = file.drop(file["congestion_surcharge"])
    file = file.withColumn("airport_fee", round(rand() * (10 - 5)+1, 0))
    file.printSchema()
    #
    imputer = Imputer() \
        .setInputCols(list(file.columns)) \
        .setOutputCols(list(file.columns)) \
        .setStrategy("mode")
    file = imputer.fit(file).transform(file)
    file.printSchema()


    intToString1 = IndexToString(
        inputCol="i_store_and_fwd_flag",
        outputCol="s_store_and_fwd_flag",
        labels=stringToInt1.labels
    )
    file = intToString1.transform(file)
    file = file.drop(file["i_store_and_fwd_flag"])
    file = file.withColumnRenamed("s_store_and_fwd_flag", "store_and_fwd_flag")
    file.printSchema()


    file = file.withColumn("VendorId", file["VendorId"].cast(StringType())) \
        .withColumn("airport_fee", file["airport_fee"].cast(StringType())) \
        .withColumn("improvement_surcharge", file["improvement_surcharge"].cast(StringType()))
        # .withColumn("mta_tax", file["mta_tax"].cast(StringType())) \
        # .withColumn("Payment_type", file["Payment_type"].cast(StringType())) \

    file.printSchema()
    file.write.mode("overwrite").save(directoryTo + "yellow_tripdata_2021-03_df")
    csvFileName = "yellow_tripdata_2021-03_csv"
    file.write \
        .mode('overwrite') \
        .option("header", value=True) \
        .csv(directoryTo + csvFileName)
