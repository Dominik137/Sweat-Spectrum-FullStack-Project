# export FLASK_APP=app.py
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 

from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from models import User, Workout, Set, Set_Workout
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
        gotten_user = User.query.filter(User.username == data['username']).first()
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

@app.route('/create_user', methods=["POST"])
def add_user():
    if request.method == "POST":
        try:
            json_dict = request.get_json()
            print(json_dict)
            new_user = User(
                username = json_dict.get("username"),
                password = json_dict.get("password")
            )
            
            db.session.add(new_user)
            db.session.commit()
            session["user"] = new_user.id 
            # After the user is created and submitted to the data base we have the set the session to that new useres id
            # so that when they create there account it wont automaticly log them out
        # this adds it to our table
            return new_user.to_dict(),201
        except Exception as e:
            print(e)
            return make_response({"errors": ["validation errors"]}, 404)
        
@app.route('/all_workouts', methods=["GET"])
def get_all_workouts():
    if request.method == "GET":
        all_workouts = Workout.query.all()
        workout_dicts = [workout.to_dict() for workout in all_workouts]
        return make_response(workout_dicts, 200)
        

if __name__ == '__main__':
    app.run(port=5555, debug=True)