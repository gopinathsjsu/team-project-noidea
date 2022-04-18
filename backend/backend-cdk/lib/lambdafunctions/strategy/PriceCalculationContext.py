import sys
sys.path.append("..")
from strategy.PriceCalculationStrategy import PriceCalculationStrategy


class PriceCalculationContext(object):

    def __init__(self, strategy: PriceCalculationStrategy):
        self.__strategy = strategy

    def calculate_price(self, origin_price):
        total_price = self.__strategy.calculate_price(origin_price)
        return total_price