from db.user import userDb
from flask import request,abort
from flask.views import MethodView
from flask_smorest import Blueprint
from schemas import userSchema,UserQuerySchema,SuccessMessageSchema
import hashlib
from flask_jwt_extended import create_access_token,jwt_required,get_jwt
from blocklist import BLOCKLIST
import jwt
blp=Blueprint("Users",__name__,description="curd user")


@blp.route("/login")
class UserLogin(MethodView):
    
    def __init__(self):
        self.db=userDb()
    @blp.arguments(userSchema)
    # @blp.response(200,SuccessMessageSchema)
    def post(self,data):
        username=data["uname"]
        print(data["uname"])
        password=hashlib.sha256(data["passwd"].encode('utf-8')).hexdigest()
        reslt=self.db.user_verify(username,password)
        if reslt:
            l=create_access_token(identity=username)
            
            return {"token":l},200
        return {"message":"username or password is wrong"},400





@blp.route("/logout")
class UserLogout(MethodView):
    

    @jwt_required()
    def post(self):
        print("kkk")
        jti=get_jwt()["jti"]
        BLOCKLIST.add(jti)
        # print(get_jwt())
        return {"message":"Successfully Logged Out"}


@blp.route("/user")
class User(MethodView):


    def __init__(self):
        self.db=userDb()
    


    @jwt_required()
    @blp.arguments(UserQuerySchema, location="query")
    @blp.response(200,userSchema)
    def get(self, args):
        id=request.args.get('id')
        res=self.db.get_user(id)
        print("succ")
        if res is None:
            abort(404,'Te User doe\'t exist')
        return res
    

    @blp.arguments(userSchema)
    @blp.response(200,SuccessMessageSchema)
    def post(self,data):
        username=data["uname"]
        password=hashlib.sha256(data["passwd"].encode('utf-8')).hexdigest()
        check=self.db.check_uname(username)
        if check:
            self.db.add_user(username,password)
            return {"message":"user added sucessfully"},201
        return {"message":"user already exist"},409
    

    # @blp.arguments(UserQuerySchema,location="query")
    # @blp.response(200,SuccessMessageSchema)
    
