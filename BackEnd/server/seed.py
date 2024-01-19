from app import app 
from models import db, User, Set, Workout, Set_Workout
from random import randint
from datetime import datetime, timedelta
with app.app_context():
    print("Deleting Users")
    User.query.delete()

    print("Creating Users")
    
    new_user_1 = User(username="Dom", password = "ZEZE")
    new_user_2 = User(username="Jack", password = "password")
    new_user_3 = User(username="Barrett", password = "password")
    users = [new_user_1,new_user_2,new_user_3]
    db.session.add_all(users)
    db.session.commit()
    print("Users Created")

    print("Deleting Sets")
    Set.query.delete()

    print("Creating Sets")
    new_set_1 = Set(user_id=1)
    new_set_2 = Set(user_id=2)
    new_set_3 = Set(user_id=1) 
    new_set_4 = Set(user_id=2)
    new_set_5 = Set(user_id=3)
    new_set_6 = Set(user_id=3)
    db.session.add_all([new_set_1,new_set_2,new_set_3,new_set_4,new_set_5,new_set_6])
    db.session.commit()
    print("Sets Created")

    print("Deleting Workouts")
    Workout.query.delete()

    print("Creating Workouts")
    new_workout_1 = Workout(
    type="Run",
    duration=timedelta(minutes=30),  # Convert string "00:30:00" to a timedelta object
    date=datetime.strptime("2020-01-01", "%Y-%m-%d").date(),  # Parse the date string
    time=datetime.strptime("12:00:00", "%H:%M:%S").time(),  # Parse the time string
    attributes="{'distance': '3.5', 'pace': '8:30'}")
    new_workout_2 = Workout(type="Bike", duration=timedelta(minutes=32), date=datetime.strptime("2020-01-01", "%Y-%m-%d").date(), time=datetime.strptime("12:00:00", "%H:%M:%S").time(), attributes="{'distance': '5.0', 'pace': '15.0'}")
    new_workout_3 = Workout(type="Swim", duration=timedelta(minutes=30), date=datetime.strptime("2020-01-01", "%Y-%m-%d").date(), time=datetime.strptime("12:00:00", "%H:%M:%S").time(), attributes="{'distance': '1.0', 'pace': '1:30'}")
    new_workout_4 = Workout(type="Run", duration=timedelta(minutes=30), date=datetime.strptime("2020-01-02", "%Y-%m-%d").date(), time=datetime.strptime("12:00:00", "%H:%M:%S").time(), attributes="{'distance': '3.5', 'pace': '8:30'}")
    new_workout_5 = Workout(type="Bike", duration=timedelta(minutes=30), date=datetime.strptime("2020-01-02", "%Y-%m-%d").date(), time=datetime.strptime("12:00:00", "%H:%M:%S").time(), attributes="{'distance': '5.0', 'pace': '15.0'}")
    new_workout_6 = Workout(type="Swim", duration=timedelta(minutes=30), date=datetime.strptime("2020-01-02", "%Y-%m-%d").date(), time=datetime.strptime("12:00:00", "%H:%M:%S").time(), attributes="{'distance': '1.0', 'pace': '1:30'}")
    new_workout_7 = Workout(type="Run", duration=timedelta(minutes=30), date=datetime.strptime("2020-01-03", "%Y-%m-%d").date(), time=datetime.strptime("12:00:00", "%H:%M:%S").time(), attributes="{'distance': '3.5', 'pace': '8:30'}")
    new_workout_8 = Workout(type="Bike", duration=timedelta(minutes=30), date=datetime.strptime("2020-01-03", "%Y-%m-%d").date(), time=datetime.strptime("12:00:00", "%H:%M:%S").time(), attributes="{'distance': '5.0', 'pace': '15.0'}")
    new_workout_9 = Workout(type="Swim", duration=timedelta(minutes=30), date=datetime.strptime("2020-01-03", "%Y-%m-%d").date(), time=datetime.strptime("12:00:00", "%H:%M:%S").time(), attributes="{'distance': '1.0', 'pace': '1:30'}")


    workouts = [new_workout_1,new_workout_2,new_workout_3,new_workout_4,new_workout_5,new_workout_6,new_workout_7,new_workout_8,new_workout_9]
    db.session.add_all(workouts)
    db.session.commit()

    print("Workouts Created")

    print("Deleting Set_Workouts")
    Set_Workout.query.delete()
    print("Creating Set_Workouts")

    new_set_workout_1 = Set_Workout(set_id=1, workout_id=1)
    new_set_workout_2 = Set_Workout(set_id=1, workout_id=2)
    new_set_workout_3 = Set_Workout(set_id=1, workout_id=3)
    new_set_workout_4 = Set_Workout(set_id=2, workout_id=4)
    new_set_workout_5 = Set_Workout(set_id=2, workout_id=5)
    new_set_workout_6 = Set_Workout(set_id=2, workout_id=6)
    new_set_workout_7 = Set_Workout(set_id=3, workout_id=7)
    new_set_workout_8 = Set_Workout(set_id=3, workout_id=8)
    new_set_workout_9 = Set_Workout(set_id=3, workout_id=9)

    set_workouts = [new_set_workout_1,new_set_workout_2,new_set_workout_3,new_set_workout_4,new_set_workout_5,new_set_workout_6,new_set_workout_7,new_set_workout_8,new_set_workout_9]
    db.session.add_all(set_workouts)
    db.session.commit()

    print("Set_Workouts Created")

