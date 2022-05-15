class ClassificationSummaryResult:
    def __init__(self, accuracy, error, precision, f1, weightedRecall, hammingLoss):
        self.accuracy = accuracy
        self.error = error
        self.precision = precision
        self.f1 = f1
        self.weightedRecall = weightedRecall
        self.hammingLoss = hammingLoss
