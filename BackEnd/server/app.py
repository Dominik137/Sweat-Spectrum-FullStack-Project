# export FLASK_APP=app.py
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 

from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from models import User
from services import api, app, db, secret_key, bcrypt


# Routes
@app.route('/')
def home():
    pass

@app.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        data = request.get_json()
        # print(data)
        gotten_user = User.query.filter(User.user_name == data['user_name']).first()
        if gotten_user:
            if gotten_user.authenticate(data['password']):
                session["user"] = gotten_user.id
                return gotten_user.to_dict(),200
            else:
                return {"Error": "Not valid password"}, 400
        else:
            return {"Error": "Not valid username"}, 400

@app.route('/session')
def check_session():
    print(session)
    if session.get('user'):
        user = User.query.filter(User.id == session["user"]).first()
        return user.to_dict()
    else:
        return {"session": "user not found"}, 404

@app.route('/logout', methods=["DELETE"])
def delete():
    if request.method == "DELETE":
        session['user'] = None
        return {}, 204



if __name__ == '__main__':
    app.run(port=5555, debug=True)