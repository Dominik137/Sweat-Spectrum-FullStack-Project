# SweatSpectrum 💦

## Introduction

Welcome to SweatSpectrum! This full stack application allows users to create and manage their workouts. It provides a simple, intuitive, and comprehensive platform for tracking & analyzing your fitness journey.
<br><br>This project was created in collaboration between Dominik Arment and Barrett Kowalsky - all in a single week. 🚵‍♀️ 🙌 🏋️‍♂️

@Dominik - https://github.com/Dominik137

@Barrett - https://github.com/barrettk8090

## Technologies Used

This project was built using a variety of technologies:

- **Python**: The primary language used for backend development.
- **Flask**: A micro web framework written in Python.
- **REST APIs**: Used for handling requests and responses between the client and server.
- **Pico CSS**: A minimalist CSS framework used for styling the frontend, allowing for rapid frontend design.
- **React**: A JavaScript library for building user interfaces.
- **Chart.js**: A popular open-source library for creating charts.
- **SQLAlchemy**: An SQL toolkit and Object-Relational Mapping (ORM) system for Python.

## Features

- User Registration and Login: New users can create an account with a username and password. Existing users can login with their credentials.
- Workout Management: Users can view, add, edit, or delete workouts within a set.
- Dashboard: Displays high-level stats about the user's workouts.
- StatsPro: Provides detailed information about each type of workout in the form of bar graphs.
- Logout: Allows users to log out and return to the login page.

## Getting Started

To get the project up and running on your local machine, follow these steps:

```bash
# Clone the repository in your computers terminal
git clone git@github.com:Dominik137/Sweat-Spectrum-FullStack-Project.git


# Navigate into the directory
cd Phase-4-Proj-Sweat-Spectrum

#(Optional) - Open in VS Code
code .

#In your terminal, navigate to /BackEnd
cd BackEnd

# Install dependencies
pipenv install && pipenv shell

# Navigate into server and run the backend application
python app.py

# In a new terminal window, navigate into the SweatSpectrum directory
cd Frontend/SweatSpectrum

# Install dependencies and launch the frontend application
npm install && npm run dev

# Finally, open SweatSpectrum in your browser and log in!
http://localhost:3000/

```

## Screens

![SweatSpectrum Landing Page with Create Account and Login](<Screenshot 2024-01-25 at 4.34.11 PM.png>)

![SweatSpectrum Dash with Stats modules and add new workout button](<Screenshot 2024-01-25 at 4.40.39 PM.png>)

![SweatSpectrum Graphs - Graph showing weight, sets, and reps for weight training](<Screenshot 2024-01-25 at 4.41.06 PM.png>)
