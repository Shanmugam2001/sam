from flask_jwt_extended import jwt_required
from flask import Blueprint


ot_routes=Blueprint("ot",__name__)

@ot_routes.route("/",methods=["GET"])
@jwt_required()
def ot_get():
    pass