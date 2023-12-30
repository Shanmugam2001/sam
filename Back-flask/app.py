from flask import Flask,jsonify
from dbfread import DBF
from flask_cors import CORS
from flask_jwt_extended import JWTManager,jwt_required
from resource.user import blp as UserBluePrint
from flask_smorest import Api
from resource.c_emp import cemp_routes
from resource.canteen import can_routes
from resource.shift_ot import ot_routes


app = Flask(__name__)
from blocklist import BLOCKLIST
from datetime import timedelta
CORS(app)
manp_path='Z:/UNIT2/MANPOWER/MANMST.DBF'
#Below three lines are neeed to run the Api flask_smorest pip package
app.config['API_TITLE'] = 'My API'
app.config['API_VERSION'] = 'v1'
app.config['OPENAPI_VERSION'] = '3.0.2'
app.config['JWT_SECRET_KEY']="545646548949595455"
app.config['JWT_EXPIRATION_DELTA'] = timedelta(days=1)

api=Api(app)
jwt=JWTManager(app)
@jwt.token_in_blocklist_loader
def check_if_in_blocklist(jwt_header,jwt_payload):
    return jwt_payload["jti"] in BLOCKLIST

@jwt.revoked_token_loader
def revoked_tokken_callback(jwt_header,jwt_payload):
    return(
        {
            "description":"user has been looged out",
            "error":"token rewoked"
        },404
    )



api.register_blueprint(UserBluePrint)
app.register_blueprint(can_routes,url_prefix='/canteen')
app.register_blueprint(cemp_routes,url_prefix='/cemp')
app.register_blueprint(ot_routes,url_prefix='/ot')




@app.route("/", methods=['GET'])
@jwt_required()
def home():
    return "<p>Hello, World!</p>"

#get all emp details from dbf
@app.route('/emps/<num>',methods=['GET'])
def employees(num):
    l=[]
    print(num)
    for re in DBF(manp_path):
        ds=dict(re)
        
        if ds["NUM"]==num:
            print(ds)
            l.append(ds)
    return l



#emploee detail using token _no
# @app.route('/emp/<int:num>',methods=['GET'])
# def employee(num):
#     for i in DBF(manp_path):
#         ds=dict(i)
#         if ds['NUM']==int(num):
#             return ds



if __name__=="__main__":
    app.run(debug=True,host='192.168.1.152')