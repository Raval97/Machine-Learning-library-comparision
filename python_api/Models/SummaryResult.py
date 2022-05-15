class SummaryResult:
    def __init__(self, regressionMetrics=None, classificationMetrics=None, time=None):
        self.regressionMetrics = regressionMetrics
        self.classificationMetrics = classificationMetrics
        self.time = time

    def setRegressionMetrics(self, regressionMetrics):
        self.regressionMetrics = regressionMetrics

    def setClassificationMetrics(self, classificationMetrics):
        self.classificationMetrics = classificationMetrics

    def setTime(self, time):
        self.time = time
