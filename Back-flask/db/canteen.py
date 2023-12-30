from db.db import Config
from datetime import datetime
class canteemDb:


    def __init__(self):
        self.conn=Config.connection
        self.cursor=self.conn.cursor()
    


    def add_centry(self,token_no,shift_c,date):
        print(date)
        qr=f"INSERT INTO canteen (token_no,shift_c,shift_date) VALUES('{token_no}',{shift_c},'{date}')"
        print(qr)
        self.cursor.execute(qr)
        print("ddd")
        self.conn.commit()


    def get_canteen(self):
        qr="SELECT TOP 100 * FROM canteen ORDER BY shift_date DESC"
        self.cursor.execute(qr)
        dd=self.cursor.fetchall()
        res=[]
        for i in dd:
            res.append({"tk_no":i.token_no,"shift_code":i.shift_c,"shift_date":i.shift_date.strftime('%Y-%m-%d %H:%M:%S')})
        return res
    
    def del_centry(self,shift_date):
        qr=f"DELETE FROM canteen WHERE shift_date='{shift_date}'"
        self.cursor.execute(qr)
        if self.cursor.rowcount==0:
            return False
        else:
            self.conn.commit()
            return True
        
    def get_report(self,sd,ed):
        
        qr=f"select c.token_no,NAME,cc.CATE,count(c.token_no) as time from canteen c,canteen_user cc where c.token_no=cc.TOKEN_NO and c.shift_date between '{sd}' and '{ed} 23:50:12'group by c.token_no,cc.NAME,cc.CATE order by cc.CATE"
        self.cursor.execute(qr)
        dd=self.cursor.fetchall()
        res=[]
        for i in dd:
            res.append({"tk_no":i.token_no,"name":i.NAME,"cate":i.CATE,"Count":i.time})
        return res
    
# kk=canteemDb()
# kk.add_centry(51254,1)
# # kk.del_centry('')
# print(kk.get_canteen())
    

# kk=canteemDb()
# print(kk.get_report('2023-12-01','2023-12-30'))