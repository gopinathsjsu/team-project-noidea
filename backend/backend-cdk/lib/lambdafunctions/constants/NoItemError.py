class NoitemError(Exception):
    """Raised when the item is not in DynamoDB"""
    def __init__(self, item, table, message="The item is not in DynamoDB"):
        self.item = item
        self.table = table
        self.message = message
        super().__init__(self.message)
        
    def __str__(self):
        return f' the item {self.item} is not in the table {self.table}'