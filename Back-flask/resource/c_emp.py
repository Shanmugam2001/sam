
from flask import Blueprint, request, jsonify
import pyodbc
import jwt
from datetime import datetime, timedelta
# from config import Config
import hashlib
from db.c_emp import c_empDb
from  db.db import Config
from flask_jwt_extended import jwt_required
#canteen_emp List
cemp_routes=Blueprint("cemp",__name__)



@cemp_routes.route('/<int:id>',methods=["GET"])
@jwt_required()
def get_cemwp(id):
    res=c_empDb().get_cemp(id)
    return res


@cemp_routes.route('/',methods=["GET"])
@jwt_required()                                                                   
def get_empc():
    conn=Config.connection
    cursor=conn.cursor()
    cursor.execute('SELECT * FROM canteen_user')
    ress=cursor.fetchall()
    res=[{"tk_no":i.TOKEN_NO,"name":i.NAME,"cate":i.CATE} for i in ress]
    return jsonify({'items': res})

@cemp_routes.route('/g/<int:_id>')
@jwt_required()
def get_cemp(_id):
    print(_id)
    dd=c_empDb()
    rs=dd.get_cempp(id=_id)
    return rs


@cemp_routes.route('/<int:id>',methods=['DELETE'])
@jwt_required()
def del_cemp(id):
    try:
        print(id,"del route")
        dd=c_empDb()
        res=dd.del_cuser(id)
        if res:
            return {"msg": f'User with ID {id} deleted successfully'},200
        return {'error': f'User with ID {id} not found'},404
    except Exception as e:
        return{'error': f'Error: {str(e)}'},500


@cemp_routes.route('/add',methods=["POST"])
@jwt_required()
def add_cem():
    try:
        data=request.get_json()
        print(data)
        dd=c_empDb()
        res=dd.chech_emp(data["tk_no"])
        print(res)
        if res:
            print("true")
            dd.add_cemp(data["tk_no"],data["name"],data["cate"])
            return {"msg":"user added sucessfully"},201
        return {"error":"Employee in already in Db"},500
    except Exception as e:
        return {"error":f'Error: {str(e)}'},500




