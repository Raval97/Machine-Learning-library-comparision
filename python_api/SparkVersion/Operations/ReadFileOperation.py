import Context
from SparkVersion.Operations.Helpers.ReadWriteFiler import safeData
from SparkVersion.Operations.Helpers.StatisticsCreator import createStatisticsSummary


def readFile(filename):
    file = Context.spark.read\
      .option("inferSchema", "true")\
      .option("header", "true")\
      .option("sep", ",")\
      .csv(Context.defaultDirectoryPath + filename)\
      .na.drop()
    safeData(file)
    return createStatisticsSummary(file)
