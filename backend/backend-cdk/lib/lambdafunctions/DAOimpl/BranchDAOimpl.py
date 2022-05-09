import os
from attr import fields
import boto3

import sys 
sys.path.append("..")
from DAO.BranchDAO import BranchDAO
from aws_helper.dynamodb import update_item_db, scan_items_db, put_item_db

class BranchDAOimple(BranchDAO):
    
    def __init__(self) -> None:
        self.branches = {}
        self.region = os.environ["region"]
        self.branch_table = os.environ["branch_table"]
        self.branchTable = boto3.resource("daynamodb", self.region).Table(self.branch_table)
        
    # Override
    def getAllBranchs(self):
        self.branches = scan_items_db(self.branchTable)
        return self.branches
    
    # Override
    def getBranch(self, branchId):
        self.branches = scan_items_db(self.branchTable)
        for branch in self.branches:
            if branch.get("branchId") == branchId:
                return branch
        return None

    # Override
    def updateBranch(self, branchId, fileds: dict):
        try:
            for key in fileds:
                update_item_db(self.branchTable, "branchId", branchId, key, fileds.get(key))
            return True
        except Exception as e:
            return str(e)
    
    # Override
    def addBranch(self, branch_item):
        put_item_db(self.branchTable, branch_item)
        return True
    
    def getBranchbyhotelId(self, hotelId):
        self.branchs = scan_items_db(self.branchTable)
        list = []
        for branch in self.branchs:
            if branch.get("hotelId") == hotelId:
                list.append(branch)
        if list:
            return list
        
        return None