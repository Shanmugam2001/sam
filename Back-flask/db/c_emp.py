from ast import Try
import pyodbc
from  db.db import Config
from flask import Blueprint, request, jsonify

class c_empDb:
    def __init__(self):
        self.conn=Config.connection
        self.cursor=self.conn.cursor()


    def get_cemp(self,id):
        qr=f"SELECT * FROM canteen_user WHERE TOKEN_NO='{id}'"
        self.cursor.execute(qr)
        dc={}
        #self.cursor.fetchall()   --fetch all
        # for i in self.cursor.fetchall():
        res=self.cursor.fetchone()
        if res is not None:
            dc["tk_no"],dc["name"],dc["cate"]=res
            return dc
    
    
    def add_cemp(self,tk_no,name,cate):
        print(tk_no)
        cate=int(cate)
        qr=f"INSERT INTO canteen_user(TOKEN_NO,NAME,CATE) VALUES('{tk_no}','{name}',{cate})"
        print(qr)
        self.cursor.execute(qr)
        self.conn.commit()
        

    
    def del_cuser(self,tk_no):
        qr=f"DELETE from canteen_user where TOKEN_NO='{tk_no}'"
        self.cursor.execute(qr)
        if self.cursor.rowcount==0:
            return False
        else:
            self.conn.commit()
            return True
        
    def get_cempp(self,id):
        qr=f"select * from canteen_user where token_no='{id}'"
        self.cursor.execute(qr)
        res=self.cursor.fetchone()
        dc={}
        if res is not None:
            dc["tk_no"],dc["name"],dc["cate"]=res
        return dc
    
    def chech_emp(self,id):
        qr=f"select * from canteen_user where TOKEN_NO='{id}'"
        self.cursor.execute(qr)
        res=self.cursor.fetchone()
        if res is not None:
            return False
        return True

# db=c_empDb()
# print(db.get_cemp(51254))