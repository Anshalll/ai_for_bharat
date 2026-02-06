from db.db import table
from flask import session
from boto3.dynamodb.conditions import Key

def getuserinfo(): 
    try: 
        username = session.get("username" , None)
        if not username:
            return {"success": False, "error": "Not logged in" , "code": 401}
        
        response = table.query(
                    IndexName="UsernameIndex",
                    KeyConditionExpression=Key("username").eq(username)
                )
        
        users = response.get("Items", [])
        if len(users) == 0:
            return {"success": False, "error": "User not found" , "code": 404}
        
        user = users[0]
        user.pop("password", None) 
        return {"success": True, "message": "user found!" , "additional" : user , "code": 200}
    
    except Exception as e: 
        print(e)
        return {"success": False, "error": str(e) , "code": 500}