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
import json


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

#Creates a route to get all the workouts
@app.route('/all_workouts', methods=["GET"])
def get_all_workouts():
    if request.method == "GET":
        all_workouts = Workout.query.all()
        workout_dicts = []
        for workout in all_workouts:
            workout_dicts.append(workout.to_dict())
        return make_response(workout_dicts, 200)

#Creates a route to get all the set workouts
@app.route('/set_workouts', methods=["GET"])
def get_set_workouts():
    if request.method == "GET":
        all_set_workouts = Set_Workout.query.all()
        set_workout_dicts = []
        for set_workout in all_set_workouts:
            set_workout_dicts.append(set_workout.to_dict())
        return make_response(set_workout_dicts, 200)

#Creates a route to return set workouts by ID
@app.route('/set_workouts/<int:id>', methods=["GET"])
def get_set_workout(id):
    if request.method == "GET":
        set_workout = Set_Workout.query.filter(Set_Workout.id == id).first()
        if set_workout:
            return set_workout.to_dict(), 200
        else:
            return make_response({"error": "Not found"}, 404)

#Creates a route for returning ALL of a users workouts based on sets
@app.route('/users/<int:user_id>/workouts', methods=["GET", "POST", "DELETE", "PATCH"])
def get_user_workouts(user_id):
    if request.method == "GET":
        user_sets = Set.query.filter(Set.user_id == user_id).all()

        user_workouts = []

        for set in user_sets:
            set_workouts = Set_Workout.query.filter_by(set_id=set.id).all()
            for set_workout in set_workouts:
                workout_details = Workout.query.get(set_workout.workout_id)
                workout_dict = workout_details.to_dict()
                # Convert the 'attributes' field from JSON string to dict using JSON loads
                ###note to SELF!!!! --> the .replace("'", '"') is needed because the json.loads() method requires double quotes, but in the seed file I had single quotes for these attributes - consider fixing
                workout_dict['attributes'] = json.loads(workout_dict['attributes'].replace("'", '"'))
                user_workouts.append(workout_dict)

        return make_response(jsonify(user_workouts), 200)
    elif request.method == "POST":
        #Post request added here - adding a workout for a user
        pass
    elif request.method == "DELETE":
        #Delete request added here - deleting a workout for a user
        pass
    elif request.method == "PATCH":
        #Patch request added here - updating a workout for a user
        pass
        

if __name__ == '__main__':
    app.run(port=5555, debug=True)