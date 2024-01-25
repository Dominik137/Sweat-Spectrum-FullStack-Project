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
    new_set_6 = Set(user_id=3)
    new_set_7 = Set(user_id=3)
    #Doms sets - Weight training
    new_set_3 = Set(user_id=1)
    #Jacks sets - HIIT set and Swim Set (separate days) 
    new_set_4 = Set(user_id=2)
    new_set_5 = Set(user_id=2)
    db.session.add_all([new_set_1,new_set_2,new_set_3,new_set_4,new_set_5, new_set_6, new_set_7])
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
        attributes='{"distance": "9.5", "pace": "8:30", "active calories": "500", "total calories": "600", "avg heart rate": "150", "max heart rate": "175", "elevation gain": "100", "notes": "felt good"}')

    new_workout_2 = Workout(
        type="Bike", 
        duration="01:31:18", 
        date=datetime.strptime("2024-01-02", "%Y-%m-%d").date(), 
        time=datetime.strptime("15:20:19", "%H:%M:%S").time(), 
        attributes='{"distance": "5.0", "pace": "15.0", "active calories": "750", "total calories": "982", "avg heart rate": "145", "max heart rate": "182", "elevation gain": "211", "notes": "really beautiful afternoon ride"}')

    new_workout_3 = Workout(
        type="Swim", 
        duration="00:45:12", 
        date=datetime.strptime("2023-07-12", "%Y-%m-%d").date(), 
        time=datetime.strptime("13:02:16", "%H:%M:%S").time(), 
        attributes='{"type": "indoor", "stroke": "backstroke", "distance": "12.0", "laps": "12", "active calories": "300", "total calories": "400", "avg heart rate": "120", "max heart rate": "150", "notes": "nice indoor swim"}')

    new_workout_4 = Workout(
        type="Weight Training", 
        duration="00:18:14", 
        date=datetime.strptime("2024-01-03", "%Y-%m-%d").date(), 
        time=datetime.strptime("12:45:00", "%H:%M:%S").time(), 
        attributes='{"muscle group": "biceps", "type": "curls", "weight": "20", "reps": "10", "sets": "3", "active calories": "50", "total calories": "60", "avg heart rate": "100", "max heart rate": "120", "notes": "PUMP!!"}')

    new_workout_5 = Workout(
        type="Weight Training", 
        duration="00:12:59", 
        date=datetime.strptime("2024-01-03", "%Y-%m-%d").date(), 
        time=datetime.strptime("12:55:00", "%H:%M:%S").time(), 
        attributes='{"muscle group": "quads", "type": "seated leg press", "weight": "95", "reps": "12", "sets": "3", "active calories": "80", "total calories": "100", "avg heart rate": "100", "max heart rate": "120", "notes": "leg day!"}')

    new_workout_6 = Workout(
        type="Weight Training", 
        duration="00:15:10", 
        date=datetime.strptime("2024-01-03", "%Y-%m-%d").date(), 
        time=datetime.strptime("13:15:00", "%H:%M:%S").time(), 
        attributes='{"muscle group": "upper body", "type": "bench press", "weight": "200", "reps": "5", "sets": "4", "active calories": "120", "total calories": "150", "avg heart rate": "110", "max heart rate": "150", "notes": "get shredded"}')

    new_workout_7 = Workout(
        type="HIIT", 
        duration="00:20:15", 
        date=datetime.strptime("2020-01-04", "%Y-%m-%d").date(), 
        time=datetime.strptime("07:02:14", "%H:%M:%S").time(), 
        attributes='{"intensity": "high", "rounds": "4", "warm up": "jog", "cool down": "stretch", "muscle group": "legs", "active calories": "340", "total calories": "420", "notes": "im dead"}')

    new_workout_8 = Workout(
        type="Run",
        duration="00:46:22",  # Convert string "00:30:00" to a timedelta object
        date=datetime.strptime("2024-01-12", "%Y-%m-%d").date(),  # Parse the date string
        time=datetime.strptime("12:30:16", "%H:%M:%S").time(),  # Parse the time string
        attributes='{"distance": "3.5", "pace": "9:30", "active calories": "280", "total calories": "310", "avg heart rate": "150", "max heart rate": "175", "elevation gain": "100", "notes": "good short run"}')

    new_workout_9 = Workout(
        type="Bike", 
        duration="01:58:18", 
        date=datetime.strptime("2024-01-13", "%Y-%m-%d").date(), 
        time=datetime.strptime("16:15:49", "%H:%M:%S").time(), 
        attributes='{"distance": "15.0", "pace": "15.0", "active calories": "950", "total calories": "1115", "avg heart rate": "145", "max heart rate": "184", "elevation gain": "272", "notes": "beat my last duration record!"}')
    
    new_workout_10 = Workout(
        type="Swim",
        duration="00:45:12",
        date=datetime.strptime("2024-01-14", "%Y-%m-%d").date(),
        time=datetime.strptime("15:17:23", "%H:%M:%S").time(),
        attributes='{"type": "indoor", "stroke": "butterfly", "distance": "12.0", "laps": "19", "active calories": "400", "total calories": "470", "avg heart rate": "130", "max heart rate": "155", "notes": "I love swimming inside!"}')
    
    new_workout_11 = Workout(
        type="Swim",
        duration="00:10:15",
        date=datetime.strptime("2024-01-14", "%Y-%m-%d").date(),
        time=datetime.strptime("15:45:19", "%H:%M:%S").time(),
        attributes='{"type": "outdoor", "stroke": "backstroke", "distance": "0.5", "laps": "1", "active calories": "90", "total calories": "100", "avg heart rate": "99", "max heart rate": "123", "notes": "Also did a short outdoor swim. Very relaxing."}')
    
    new_workout_12 = Workout(
        type="Weight Training",
        duration="00:10:00",
        date=datetime.strptime("2024-01-12", "%Y-%m-%d").date(),
        time=datetime.strptime("12:50:26", "%H:%M:%S").time(),
        attributes='{"muscle group": "biceps", "type": "curls", "weight": "25", "reps": "15", "sets": "3", "active calories": "70", "total calories": "94", "avg heart rate": "123", "max heart rate": "161", "notes": "Good start to the workout, should be able to increase weight to 30 next time."}')
    
    new_workout_13 = Workout(
        type="Weight Training",
        duration="00:15:00",
        date=datetime.strptime("2024-01-12", "%Y-%m-%d").date(),
        time=datetime.strptime("13:10:11", "%H:%M:%S").time(),
        attributes='{"muscle group": "quads", "type": "seated leg press", "weight": "100", "reps": "12", "sets": "3", "active calories": "90", "total calories": "111", "avg heart rate": "100", "max heart rate": "120", "notes": "Definitely overdid it. Should have stuck with 95."}')
    
    new_workout_14 = Workout(
        type="Weight Training",
        duration="00:15:00",
        date=datetime.strptime("2024-01-12", "%Y-%m-%d").date(),
        time=datetime.strptime("13:30:00", "%H:%M:%S").time(),
        attributes='{"muscle group": "upper body", "type": "bench press", "weight": "200", "reps": "2", "sets": "4", "active calories": "120", "total calories": "150", "avg heart rate": "110", "max heart rate": "150", "notes": "get shredded"}')
    
    new_workout_15 = Workout(
        type="Weight Training",
        duration="00:10:00",
        date=datetime.strptime("2024-01-12", "%Y-%m-%d").date(),
        time=datetime.strptime("13:50:00", "%H:%M:%S").time(),
        attributes='{"muscle group": "upper body", "type": "bench press", "weight": "100", "reps": "6", "sets": "3", "active calories": "100", "total calories": "121", "avg heart rate": "120", "max heart rate": "162", "notes": "stacking workouts"}')
    
    new_workout_16 = Workout(
        type="Run",
        duration="00:30:00",
        date=datetime.strptime("2024-01-11", "%Y-%m-%d").date(),
        time=datetime.strptime("14:30:01", "%H:%M:%S").time(),
        attributes='{"distance": "2.6", "pace": "9:19", "active calories": "220", "total calories": "260", "avg heart rate": "145", "max heart rate": "158", "elevation gain": "30", "notes": "A pleasant short run. Can definitely increase distance next time."}')
    
    new_workout_17 = Workout(
        type="HIIT",
        duration="00:20:00",
        date=datetime.strptime("2024-01-11", "%Y-%m-%d").date(),
        time=datetime.strptime("15:23:08", "%H:%M:%S").time(),
        attributes='{"intensity": "high", "rounds": "4", "warm up": "jog", "cool down": "stretch", "muscle group": "legs", "active calories": "340", "total calories": "420", "notes": "Exhausting, especially right after my run."}')
    
    new_workout_18 = Workout(
        type="Bike",
        duration="01:23:00",
        date=datetime.strptime("2024-01-11", "%Y-%m-%d").date(),
        time=datetime.strptime("16:24:19", "%H:%M:%S").time(),
        attributes='{"distance": "17.34", "pace": "5:23", "active calories": "899", "total calories": "954", "avg heart rate": "163", "max heart rate": "181", "elevation gain": "343", "notes": "Never doing this many workouts in one day ever again..."}')
    



    workouts = [new_workout_1,new_workout_2,new_workout_3,new_workout_4,new_workout_5,new_workout_6,new_workout_7,new_workout_8,new_workout_9, new_workout_10, new_workout_11, new_workout_12, new_workout_13, new_workout_14, new_workout_15, new_workout_16, new_workout_17, new_workout_18]
    db.session.add_all(workouts)
    db.session.commit()

    print("Workouts Created")

    print("Deleting Set_Workouts")
    Set_Workout.query.delete()
    print("Creating Set_Workouts")

    #Barrets set workouts
    #Day4 - Set 1 
    new_set_workout_1 = Set_Workout(set_id=1, workout_id=1)
    new_set_workout_2 = Set_Workout(set_id=1, workout_id=2)
    new_set_workout_10 = Set_Workout(set_id=1, workout_id=10)
    new_set_workout_11 = Set_Workout(set_id=1, workout_id=11)
    #Day 3 - Set 2
    new_set_workout_3 = Set_Workout(set_id=2, workout_id=8)
    new_set_workout_4 = Set_Workout(set_id=2, workout_id=9)
    # Day 2 - Set 6
    new_set_workout_12 = Set_Workout(set_id=6, workout_id=12)
    new_set_workout_13 = Set_Workout(set_id=6, workout_id=13)
    new_set_workout_14 = Set_Workout(set_id=6, workout_id=14)
    new_set_workout_15 = Set_Workout(set_id=6, workout_id=15)

    #Day 1 - Set 7
    new_set_workout_16 = Set_Workout(set_id=7, workout_id=16)
    new_set_workout_17 = Set_Workout(set_id=7, workout_id=17)
    new_set_workout_18 = Set_Workout(set_id=7, workout_id=18)

    #Doms set workouts
    new_set_workout_5 = Set_Workout(set_id=3, workout_id=4)
    new_set_workout_6 = Set_Workout(set_id=3, workout_id=5)
    new_set_workout_7 = Set_Workout(set_id=3, workout_id=6)

    #Jacks set workouts
    new_set_workout_8 = Set_Workout(set_id=4, workout_id=3)
    new_set_workout_9 = Set_Workout(set_id=5, workout_id=7)

    set_workouts = [new_set_workout_1,new_set_workout_2,new_set_workout_3,new_set_workout_4,new_set_workout_5,new_set_workout_6,new_set_workout_7,new_set_workout_8,new_set_workout_9,new_set_workout_10, new_set_workout_11, new_set_workout_12, new_set_workout_13, new_set_workout_14, new_set_workout_15, new_set_workout_16, new_set_workout_17, new_set_workout_18]
    db.session.add_all(set_workouts)
    db.session.commit()

    print("Set_Workouts Created")

