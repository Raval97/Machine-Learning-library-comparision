class SummaryResult:
    def __init__(self, regressionMetrics=None, classificationMetrics=None,
                 prepareDataTime=None, trainingModelTime=None, calculateMetricsTime=None,):
        self.regressionMetrics = regressionMetrics
        self.classificationMetrics = classificationMetrics
        self.prepareDataTime = prepareDataTime
        self.trainingModelTime = trainingModelTime
        self.calculateMetricsTime = calculateMetricsTime

    def setRegressionMetrics(self, regressionMetrics):
        self.regressionMetrics = regressionMetrics

    def setClassificationMetrics(self, classificationMetrics):
        self.classificationMetrics = classificationMetrics

    def setPrepareDataTime(self, time):
        self.prepareDataTime = time

    def setTrainingModelTime(self, time):
        self.trainingModelTime = time

    def setCalculateMetricsTime(self, time):
        self.calculateMetricsTime = time
