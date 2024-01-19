from app import app 
from models import db, User
from random import randint
with app.app_context():
    print("Deleting Users")
    User.query.delete()
    
    new_user_1 = User(username="Dom", password = "ZEZE")
    new_user_2 = User(username="Jack", password = "password")
    new_user_3 = User(username="Barrett", password = "password")
    users = [new_user_1,new_user_2,new_user_3]
    db.session.add_all(users)
    db.session.commit()