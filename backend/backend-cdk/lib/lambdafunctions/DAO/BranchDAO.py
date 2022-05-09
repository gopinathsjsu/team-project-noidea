from abc import ABC, abstractmethod

class BranchDAO(ABC):
    @abstractmethod
    def getAllBranchs(self):
        pass
    @abstractmethod
    def getBranch(self, branchId):
        pass
    @abstractmethod
    def updateBranch(self, branchId, fileds: dict):
        pass
    @abstractmethod
    def deleteBranch(self, branchId):
        pass
    @abstractmethod
    def addBranch(self):
        pass