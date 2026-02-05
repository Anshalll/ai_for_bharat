from db.db import table
import uuid
from flask import session
from boto3.dynamodb.conditions import Key
from functions import check_pass


def Login(request): 
    try: 
        username = request.get("username" , None)
        password = request.get("password" , None)
        
        if not username or not password: 
            return {"success": False, "error": "Username and password required" , "code": 400}
        
        response = table.query(
                    IndexName="UsernameIndex",
                    KeyConditionExpression=Key("username").eq(username)
                )

        users = response.get("Items", [])
        if len(users) == 0:
            return {"success": False, "error": "User not found" , "code": 404}
        
        user = users[0]
        if user["password"] != password:
            return {"success": False, "error": "Invalid credentials" , "code": 401}
        session["username"] = username
        return {"success": True, "message": "Login successful" , "code": 200}
        
        
    except Exception as e: 
        print(e)
        return {"message": "Login failed"}, 500
    
def Register(request): 
    try: 
        username = request.get("username" , None)
        password = request.get("password" , None)
        email = request.get("email" , None)
        
        
        if not username or username.strip() == "": 
            return {"success" : False , "error": "Username is required" , "code": 400}
        
        if not email or email.strip() == "": 
            return {"success" : False ,"error": "Email is required" , "code": 400}
        
        if not password or password.strip() == "": 
            return {"success" : False , "error": "Password is required" , "code": 400}
        
        
        checkuser = table.query(
                    IndexName="UsernameIndex",
                    KeyConditionExpression=Key("username").eq(username)
                )
        
        if checkuser.get("Items", []):
            return {"success": False, "error": "Username already exists" , "code": 409}
        
        
        checkpass = check_pass.validate_password(password)
        if checkpass:
            return {"success": False, "error": checkpass , "code": 400}
        
        table.put_item(
            Item={
                "id": str(uuid.uuid4()),
                "username": username,
                "password": password,
                "email" : email
            }
        )
        session["username"] = username
        return {"success" : True , "message": "User registered successfully" , "code": 201}

    except Exception as e: 
        print(e)
        return {"success": False, "error": "Registration failed" , "code": 500}