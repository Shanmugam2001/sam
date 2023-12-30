from marshmallow import Schema,fields

class userSchema(Schema):
    id=fields.Int(dump_only=True)
    uname=fields.Str(required=True)
    passwd=fields.Str(required=True,load_only=True) #load_only for using login into system


class UserQuerySchema(Schema):
    id=fields.Int(dump_only=True)


class SuccessMessageSchema(Schema):
    message=fields.Str(required=True)