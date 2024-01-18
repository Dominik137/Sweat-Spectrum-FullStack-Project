from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin

from sqlalchemy.ext.hybrid import hybrid_property
from services import bcrypt,db

class User(db.Model, SerializerMixin):
    __tablename__ = "Users"
    user_name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)



# @validate, makes sure username is unique