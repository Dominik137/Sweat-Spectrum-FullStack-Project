from app import app 
from models import db, User, Set, Workout, Set_Workout
from random import randint
from datetime import datetime, timedelta
with app.app_context():
    print("Deleting Users")
    User.query.delete()

    print("Creating Users")
    
    new_user_1 = User(username="Dom", password = "1231")
    new_user_2 = User(username="Jack", password = "password")
    new_user_3 = User(username="Barrett", password = "password")
    users = [new_user_1,new_user_2,new_user_3]
    db.session.add_all(users)
    db.session.commit()
    print("Users Created")

    print("Deleting Sets")
    Set.query.delete()

    print("Creating Sets")
    #Barretts sets - running and biking
    new_set_1 = Set(user_id=3)
    new_set_2 = Set(user_id=3)
    #Doms sets - Weight training
    new_set_3 = Set(user_id=1)
    #Jacks sets - HIIT set and Swim Set (separate days) 
    new_set_4 = Set(user_id=2)
    new_set_5 = Set(user_id=2)
    db.session.add_all([new_set_1,new_set_2,new_set_3,new_set_4])
    db.session.commit()
    print("Sets Created")

    print("Deleting Workouts")
    Workout.query.delete()

    print("Creating Workouts")
    new_workout_1 = Workout(
        type="Run",
        duration="01:46:18",
        date=datetime.strptime("2024-01-02", "%Y-%m-%d").date(),  # Parse the date string
        time=datetime.strptime("12:22:06", "%H:%M:%S").time(),  # Parse the time string
        attributes="{'distance': '9.5', 'pace': '8:30', 'active calories': '500', 'total calories': '600', 'avg heart rate': '150', 'max heart rate': '175', 'elevation gain': '100', 'notes': 'felt good'}")

    new_workout_2 = Workout(
        type="Bike", 
        duration="01:31:18", 
        date=datetime.strptime("2024-01-02", "%Y-%m-%d").date(), 
        time=datetime.strptime("15:20:19", "%H:%M:%S").time(), 
        attributes="{'distance': '5.0', 'pace': '15.0', 'active calories': '750', 'total calories': '982', 'avg heart rate': '145', 'max heart rate': '182', 'elevation gain': '343', 'notes': 'really beautiful afternoon ride'}")

    new_workout_3 = Workout(
        type="Swim", 
        duration="00:45:12", 
        date=datetime.strptime("2023-07-12", "%Y-%m-%d").date(), 
        time=datetime.strptime("13:02:16", "%H:%M:%S").time(), 
        attributes="{'type': 'indoor', 'stroke': 'backstroke', 'distance': '12.0', 'laps': '12', 'active calories': '300', 'total calories': '400', 'avg heart rate': '120', 'max heart rate': '150', 'notes': 'nice indoor swim'}")

    new_workout_4 = Workout(
        type="Weight Training", 
        duration="00:18:14", 
        date=datetime.strptime("2024-01-03", "%Y-%m-%d").date(), 
        time=datetime.strptime("12:45:00", "%H:%M:%S").time(), 
        attributes="{'muscle group': 'biceps', 'type': 'curls', 'weight': '20', 'reps': '10', 'sets': '3', 'active calories': '50', 'total calories': '60', 'avg heart rate': '100', 'max heart rate': '120', 'notes': 'PUMP!!'}")

    new_workout_5 = Workout(
        type="Weight Training", 
        duration="00:12:59", 
        date=datetime.strptime("2024-01-03", "%Y-%m-%d").date(), 
        time=datetime.strptime("12:55:00", "%H:%M:%S").time(), 
        attributes="{'muscle group': 'quads', 'type': 'seated leg press', 'weight': '95', 'reps': '12', 'sets': '3', 'active calories': '80', 'total calories': '100', 'avg heart rate': '100', 'max heart rate': '120', 'notes': 'leg day!'}")

    new_workout_6 = Workout(
        type="Weight Training", 
        duration="00:15:10", 
        date=datetime.strptime("2024-01-03", "%Y-%m-%d").date(), 
        time=datetime.strptime("13:15:00", "%H:%M:%S").time(), 
        attributes="{'muscle group': 'upper body', 'type': 'bench press', 'weight': '200', 'reps': '5', 'sets': '4', 'active calories': '120', 'total calories': '150', 'avg heart rate': '110', 'max heart rate': '150', 'notes': 'get shredded'}")

    new_workout_7 = Workout(
        type="HIIT", 
        duration="00:20:15", 
        date=datetime.strptime("2020-01-04", "%Y-%m-%d").date(), 
        time=datetime.strptime("07:02:14", "%H:%M:%S").time(), 
        attributes="{'intensity': 'high', 'rounds': '4', 'warm up': 'jog', 'cool down': 'stretch', 'muscle group': 'legs', 'active calories': '340', 'total calories': '420', 'notes': 'im dead'}")

    new_workout_8 = Workout(
        type="Run",
        duration="00:46:22",  # Convert string "00:30:00" to a timedelta object
        date=datetime.strptime("2024-01-12", "%Y-%m-%d").date(),  # Parse the date string
        time=datetime.strptime("12:30:16", "%H:%M:%S").time(),  # Parse the time string
        attributes="{'distance': '3.5', 'pace': '9:30', 'active calories': '280', 'total calories': '310', 'avg heart rate': '150', 'max heart rate': '175', 'elevation gain': '100', 'notes': 'good short run'}")

    new_workout_9 = Workout(
        type="Bike", 
        duration="01:58:18", 
        date=datetime.strptime("2024-01-13", "%Y-%m-%d").date(), 
        time=datetime.strptime("16:15:49", "%H:%M:%S").time(), 
        attributes="{'distance': '15.0', 'pace': '15.0', 'active calories': '950', 'total calories': '1115', 'avg heart rate': '145', 'max heart rate': '184', 'elevation gain': '343', 'notes': 'beat my last duration record!'}")


    workouts = [new_workout_1,new_workout_2,new_workout_3,new_workout_4,new_workout_5,new_workout_6,new_workout_7,new_workout_8,new_workout_9]
    db.session.add_all(workouts)
    db.session.commit()

    print("Workouts Created")

    print("Deleting Set_Workouts")
    Set_Workout.query.delete()
    print("Creating Set_Workouts")

    #Barrets set workouts
    #Day1
    new_set_workout_1 = Set_Workout(set_id=1, workout_id=1)
    new_set_workout_2 = Set_Workout(set_id=1, workout_id=2)
    #Day2
    new_set_workout_3 = Set_Workout(set_id=2, workout_id=8)
    new_set_workout_4 = Set_Workout(set_id=2, workout_id=9)

    #Doms set workouts
    new_set_workout_5 = Set_Workout(set_id=3, workout_id=4)
    new_set_workout_6 = Set_Workout(set_id=3, workout_id=5)
    new_set_workout_7 = Set_Workout(set_id=3, workout_id=6)

    #Jacks set workouts
    new_set_workout_8 = Set_Workout(set_id=4, workout_id=3)
    new_set_workout_9 = Set_Workout(set_id=5, workout_id=7)

    set_workouts = [new_set_workout_1,new_set_workout_2,new_set_workout_3,new_set_workout_4,new_set_workout_5,new_set_workout_6,new_set_workout_7,new_set_workout_8,new_set_workout_9]
    db.session.add_all(set_workouts)
    db.session.commit()

    print("Set_Workouts Created")

