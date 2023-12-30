import odbc
from db.db import Config

import pyodbc


# Establish the connection
# connection = pyodbc.connect(connection_string)
class userDb:


    def __init__(self):
        self.conn=Config.connection
        self.cursor=self.conn.cursor()
    


    def add_user(self,uname,passwd):
        qr=f"INSERT INTO users(uname,passwd) VALUES('{uname}','{passwd}')"
        self.cursor.execute(qr)
        self.conn.commit()


    def check_uname(self,uname):
        qr=f"SELECT * FROM users WHERE uname='{uname}'"
        self.cursor.execute(qr)
        res=self.cursor.fetchone()
        if res is not None:
            return False
        return True

    def del_user(self,id):
        qr=f"DELETE FROM users WHERE id={id}"
        self.cursor.execute(qr)
        print(self.cursor.rowcount)
        if self.cursor.rowcount==0:
            return False
        else:
            self.conn.commit()
            return True
        

    def up_user(self,id,passwd):
        qr=f"UPDATE users SET password={passwd} WHERE id={id}"
        self.cursor.execute(qr)
        self.conn.commit()


    def get_user(self,id):
        print(id)
        qr=f"select * from users where id='{id}'"
        self.cursor.execute(qr)
        dc={}
        #self.cursor.fetchall()   --fetch all
        # for i in self.cursor.fetchall():
        res=self.cursor.fetchone()
        if res is not None:
            dc["id"],dc["uname"],dc["passwd"]=res
            return dc


    def get_users(self):
        qr=f"select * from users"
        self.cursor.execute(qr)
        data=self.cursor.fetchall()
        l=[]
        for i in data:
            dc={}
            dc["id"],dc["uname"],dc["passwd"]=i
            l.append(dc)
        return l
    



    def user_verify(self,uname,passwd):
        print(uname,passwd)
        qr=f"select * from users where uname='{uname}'and passwd='{passwd}'"
        self.cursor.execute(qr)
        res=self.cursor.fetchone()
        print(res)
        if res is not None:
            dc={}
            dc["id"],dc["uname"],dc["passwd"]=res
            return True
    


# dk=userDb()
# print(dk.get_users())

