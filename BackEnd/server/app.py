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
from datetime import datetime


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
            # After the user is created and submitted to the data base we have the set the session to that new users id
            # so that when they create there account it wont automaticly log them out
        # this adds it to our table
            return new_user.to_dict(),201
        except Exception as e:
            print(e)
            return make_response({"errors": ["validation errors"]}, 404)

# Creates a route to get all the workouts, or post a new individual workout
@app.route('/all_workouts', methods=["GET", "POST"])
def get_all_workouts():
    if request.method == "GET":
        all_workouts = Workout.query.all()
        workout_dicts = []
        for workout in all_workouts:
            workout_dicts.append(workout.to_dict())
        return make_response(workout_dicts, 200)

# Creates a route to get all the set workouts
@app.route('/set_workouts', methods=["GET"])
def get_set_workouts():
    if request.method == "GET":
        all_set_workouts = Set_Workout.query.all()
        set_workout_dicts = []
        for set_workout in all_set_workouts:
            set_workout_dicts.append(set_workout.to_dict())
        return make_response(set_workout_dicts, 200)

# Creates a route to return set workouts by ID
@app.route('/set_workouts/<int:id>', methods=["GET"])
def get_set_workout(id):
    if request.method == "GET":
        set_workout = Set_Workout.query.filter(Set_Workout.id == id).first()
        if set_workout:
            return set_workout.to_dict(), 200
        else:
            return make_response({"error": "Not found"}, 404)

# Creates a route for returning ALL of a users workouts based on sets
# MAIN DASHBOARD VIEW FOR A USER
@app.route('/users/<int:user_id>/workouts', methods=["GET", "POST", "DELETE", "PATCH"])
def get_user_workouts(user_id):
    if request.method == "GET":
        user_sets = Set.query.filter(Set.user_id == user_id).all()

        user_workouts_list = []

        for set in user_sets:
            set_workouts = Set_Workout.query.filter_by(set_id=set.id).all()
            workouts_for_set = []

            for set_workout in set_workouts:
                workout_details = Workout.query.get(set_workout.workout_id)
                workout_dict = workout_details.to_dict()
                workout_dict['attributes'] = json.loads(workout_dict['attributes'].replace("'", '"'))
                workouts_for_set.append(workout_dict)
            user_workouts_list.append(workouts_for_set)
        
        return make_response(jsonify(user_workouts_list), 200)
    elif request.method == "POST":
        #Post request added here - adding a workout for a user
        pass
    elif request.method == "DELETE":
        #Delete request added here - deleting a workout for a user
        pass
    elif request.method == "PATCH":
        #Patch request added here - updating a workout for a user
        pass

# Creates a route for deleting a single workout by ID 
# MAIN WORKOUT EDIT FUNCTIONALITY FOR USER
@app.route('/users/<int:user_id>/workouts/<int:workout_id>', methods=["DELETE", "PATCH"])
def modify_user_workout(user_id, workout_id):
    # Delete a single workout by ID
    if request.method == "DELETE":
        workout_to_delete = Workout.query.get(workout_id)
        if workout_to_delete:
            db.session.delete(workout_to_delete)
            db.session.commit()
            return make_response({"success": "Workout deleted"}, 204)
        else:
            return make_response({"error": "Not found"}, 404)
    # Update a single workout by ID
    elif request.method == "PATCH":
        single_workout = Workout.query.filter(Workout.id == workout_id).first()
        if single_workout:
            try:
                data = request.get_json()
                for attr in data:
                    # Convert date and time strings to date and time objects
                    if attr == 'date':
                        data[attr] = datetime.strptime(data[attr], '%Y-%m-%d').date()
                    elif attr == 'time':
                        data[attr] = datetime.strptime(data[attr], '%H:%M:%S').time()
                    setattr(single_workout, attr, data[attr])
                db.session.add(single_workout)
                db.session.commit()
                return make_response(single_workout.to_dict(), 202)
            except Exception as e:
                return make_response({"errors": [str(e)]}, 404)
        else:
            return make_response({"error": "Workout not found"}, 404)
    
# Creates a route for adding a new workout for a user to a set, either an existing one or creating a new one.
@app.route('/new_workout/<int:user_id>/<int:set_id>', methods=["POST"])
def create_user_workout(user_id, set_id):

    if request.method == "POST":
        # set_id == 0 checks if a current set_id exists. If not, a new one is created.
        if set_id == 0:
            try:
                data = request.get_json()
                workout = Workout(
                    type=data['type'],
                    duration=data['duration'],
                    date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
                    time=datetime.strptime(data['time'], '%H:%M:%S').time(),
                    attributes=data['attributes']
                    )
                db.session.add(workout)
                db.session.commit()
                
                new_set = Set(user_id=user_id)
                db.session.add(new_set)
                db.session.commit()

                new_set_workout = Set_Workout(
                    set_id = new_set.id,
                    workout_id = workout.id
                )
                db.session.add(new_set_workout)
                db.session.commit()

                return jsonify(workout.to_dict()), 201
            except Exception as e:
                return make_response({"errors": [str(e)]}, 404)
        # set_id > 0 checks if a current set_id exists. If so, the workout is added to that existing set.
        elif set_id > 0:
            try:
                data = request.get_json()
                workout = Workout(
                    type=data['type'],
                    duration=data['duration'],
                    date=datetime.strptime(data['date'], '%Y-%m-%d').date(),
                    time=datetime.strptime(data['time'], '%H:%M:%S').time(),
                    attributes=data['attributes']
                    )
                db.session.add(workout)
                db.session.commit()

                new_set_workout = Set_Workout(
                    #Set to the current set_id
                    set_id = set_id,
                    workout_id = workout.id
                )
                db.session.add(new_set_workout)
                db.session.commit()

                return jsonify(workout.to_dict()), 201
            except Exception as e:
                return make_response({"errors": [str(e)]}, 404)

if __name__ == '__main__':
    app.run(port=5555, debug=True)