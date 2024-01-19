from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

from sqlalchemy.ext.hybrid import hybrid_property
from services import db, bcrypt

##Barrett -> Table Models 

class Set(db.Model, SerializerMixin):
    __tablename__ = "Sets"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('Users.id'))

    #Set user relationship
    users = db.relationship('User', back_populates='Set')

    #Set set_workout relationship
    Set_Workouts = db.relationship('Set_Workout', back_populates='Set')


class Workout(db.Model, SerializerMixin):
    __tablename__ = "Workouts"
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String, nullable=False)
    duration = db.Column(db.Interval, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time, nullable=False)
    attributes = db.Column(db.String, nullable=False)

    #Set set_workout relationship
    Set_Workouts = db.relationship('Set_Workout', back_populates='Workout')

    #Add validations for Workout
    #Note: Remove this if we want to add ability for user to create their own workout type.
    @validates('type')
    def validate_type(self, key, value):
        types = ['Run', 'Bike', 'Swim', 'Weight Training', 'HIIT']
        if value in types:
            return value
        else:
            raise ValueError("Invalid Type")
        


#JOIN TABLE 
class Set_Workout(db.Model, SerializerMixin):
    __tablename__ = "Set_Workouts"
    id = db.Column(db.Integer, primary_key=True)

    #Create Foreign Keys for set and workout 
    set_id = db.Column(db.Integer, db.ForeignKey('Sets.id'))
    workout_id = db.Column(db.Integer, db.ForeignKey('Workouts.id'))

    #Set set_workout relationship
    set = db.relationship('Set', back_populates='Set_Workouts')
    workout = db.relationship('Workout', back_populates='Set_Workouts')


##################################

class User(db.Model, SerializerMixin):
    __tablename__ = "Users"
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)

    @hybrid_property
    def password(self):
        return self._password_hash
    
        # Now we create a setter function!
    @password.setter
    def password(self, password):
        #NOTE WE NEED THE ENCODE AND DECODE IN PYTHON 3 DUE TO SPECIAL CHARACTERS ∫
        password_hash = bcrypt.generate_password_hash(password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    # Now lets create an authentification route using
    # bcrypt.check_password_hash(_password_hash, password.encode('utf-8'))
    def authenticate(self,password):
        return bcrypt.check_password_hash(self._password_hash,password.encode('utf-8'))