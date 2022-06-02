class ClassificationSummaryResult:
    def __init__(self, accuracy=0, error=1, precision=0, f1=0, weightedRecall=0, hammingLoss=1):
        self.accuracy = accuracy
        self.error = error
        self.precision = precision
        self.f1 = f1
        self.weightedRecall = weightedRecall
        self.hammingLoss = hammingLoss
