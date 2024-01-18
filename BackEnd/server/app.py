# export FLASK_APP=app.py
# flask db init
# flask db revision --autogenerate -m 'Create tables' 
# flask db upgrade 

from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_cors import CORS
from models import db, User
from services import api,app

@app.routes('/')
def home():
    pass











if __name__ == '__main__':
    app.run(port=5555, debug=True)