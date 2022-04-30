class PriceCalculationStrategy:

    def calculate_price(self, origin_price):
        pass


class LoyaltyPlatinum(PriceCalculationStrategy):
    """
    The Platinum customer has 15% discount
    """

    def calculate_price(self, origin_price):
        total = float (origin_price * 0.85) 
        return total

class LoyaltyGlod(PriceCalculationStrategy):
    """
    The Glod customer has 10% discount
    """

    def calculate_price(self, origin_price):
        total = float (origin_price * 0.9) 
        return total

class LoyaltySilver(PriceCalculationStrategy):
    """
    The Glod customer has 5% discount
    """

    def calculate_price(self, origin_price):
        total = float (origin_price * 0.95) 
        return total

class LoyaltyBronzer(PriceCalculationStrategy):
    """
    The brozer customer has 2% discount
    """
    
    def calculate_price(self, origin_price):
        total = float (origin_price * 0.98) 
        return total

class SummerSeason(PriceCalculationStrategy):
    def calculate_price(self, origin_price):
        return float(origin_price * 1.15)

class ChristmasSeason(PriceCalculationStrategy):
    def calculate_price(self, origin_price):
        return float (origin_price * 0.95)

class RegularSeason(PriceCalculationStrategy):
    def calculate_price(self, origin_price):
        return origin_price

class Weekdays(PriceCalculationStrategy):
    def calculate_price(self, origin_price):
        return origin_price

class Weekends(PriceCalculationStrategy):
    def calculate_price(self, origin_price):
        return float (origin_price * 1.15)
        
class Holidays(PriceCalculationStrategy):
    def calculate_price(self, origin_price):
        return float (origin_price * 1.5)