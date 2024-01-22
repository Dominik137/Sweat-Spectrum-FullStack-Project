import DashStats from "./DashStats"
import WorkoutList from "./DashWorkouts"
import {useState, useEffect} from "react"


function Dashboard({user}){
   
   
   


    return(
        //Full dashboard page that contains the high level stats, individual workouts for a single user, and an "Add Workout" button.
        <div className="grid">
            <div className="">
                    <h1>Dashboard</h1>
                    <DashStats />
                    <p>StatsPro</p>
                    <p>Logout</p>
                    <hr/>
                <div>
                <p>Add a new workout</p>
                <button>+</button>
            </div>
            <WorkoutList user={user}/>
        </div>
        </div>
    )
    }
    
export default Dashboard