from flask_jwt_extended import jwt_required
from db.canteen import canteemDb
from flask import Blueprint, request
from db.c_emp import c_empDb
can_routes=Blueprint("can",__name__)

db=canteemDb()
    


@can_routes.route("/report",methods=["GET"])
@jwt_required()
def report():
    print("report")
    sd=request.args.get('arg1')
    ed=request.args.get('arg2')
    print("dfdff",sd,ed)
    try:
        res=db.get_report(sd,ed)
        return {"data":res},200
    except Exception as ee:
        return {"error":f'Error: {str(ee)}'}
    

@can_routes.route("/",methods=["GET"])
@jwt_required()
def get_list():
    print("sss")
    try:
        res=db.get_canteen()
        return {"data":res},200
    except Exception as ee:
        return {"error":f'Error: {str(ee)}'},404  
    


@can_routes.route("/",methods=["POST"])
@jwt_required()
def post_centry():
    print("ddd")
    try:
        data=request.get_json()
        print(data)
        dd=c_empDb()
        res=dd.chech_emp(data["tk_no"])
        if res!=True:
            db.add_centry(data["tk_no"],data["shift_code"],data["shift_date"])
            print("ddfdffdf")
            return {"msg":"user added sucessfully"},201 
    except Exception as e:
        return {"error":f'Error: {str(e)}'},500
    

@can_routes.route('/<date>',methods=["DELETE"])
@jwt_required()
def delete_centry(date):
    
    try:
        print(date)
        res=db.del_centry(date)
        if res:
            return {"msg": f'User with ID {date} deleted successfully'},200
        return {'error': f'User with ID {date} not found'},404
    except Exception as e:
        return{'error': f'Error: {str(e)}'},500








#  SELECT
#   cu.token_no,
#   cu.name,
#   COUNT(*) AS count
# FROM
#   canteen_user cu
# JOIN
#   canteen c ON cu.token_no = c.token_no
# GROUP BY
#   cu.token_no, cu.name;


#   select c.token_no,NAME,cc.CATE,count(c.token_no) as time from canteen c,canteen_user cc where c.token_no=cc.TOKEN_NO group by c.token_no,cc.NAME,cc.CATE

