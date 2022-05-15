class NumberColumnsSummary:
    def __init__(self, count, name, mean, stdDev, min,
                 percentage25, percentage50, percentage75, max):
        self.count = count
        self.name = name
        self.mean = mean
        self.stdDev = stdDev
        self.min = min
        self.percentage25 = percentage25
        self.percentage50 = percentage50
        self.percentage75 = percentage75
        self.max = max
