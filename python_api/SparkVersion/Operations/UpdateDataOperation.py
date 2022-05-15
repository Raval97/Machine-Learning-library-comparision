from pyspark.sql.types import IntegerType
import shutil

from Context import getDataFrameFilePath
from SparkVersion.Operations.Helpers.ReadWriteFiler import readData, safeData
from SparkVersion.Operations.Helpers.StatisticsCreator import createStatisticsSummary


def castToInt(parameter):
    data = readData()
    newData = data.withColumn(parameter, data[parameter].cast(IntegerType())).na.drop()
    safeData(newData, path=getDataFrameFilePath() + '2')
    summary = createStatisticsSummary(newData)

    shutil.rmtree(getDataFrameFilePath())
    shutil.move(getDataFrameFilePath() + '2', getDataFrameFilePath())
    return summary
