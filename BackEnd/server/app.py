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

@app.route('/session', methods={"GET", "POST"})
def handle_session():
   if request.method == "GET":
      print(session)
      return {},200
   elif request.method == "POST":
      data = request.get_json()
      session["test"] = data["test"]
      return {},200

@app.route('/login', methods=['POST'])
def login():
    if request.method == "POST":
        data = request.get_json()
        gotten_user = User.query.filter(User.user_name == data["user_name"]).first()
        # we are querying to see if the data being sent to use "posted" is the username that matches one in our database
        if gotten_user:
            # if that user exits we are setting them to the session for login purposes
            session["user"] = gotten_user
            return gotten_user.to_dict()
        else:
            return{"Error": "Not Valid Username"}, 400






if __name__ == '__main__':
    app.run(port=5555, debug=True)