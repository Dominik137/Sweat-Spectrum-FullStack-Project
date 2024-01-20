import DashStats from "./DashStats"
import WorkoutList from "./DashWorkouts"
import {useState, useEffect} from "react"

function Dashboard(){

    const [workouts, setWorkouts] = useState([])

    useEffect(()=>{
        fetch("/api/all_workouts")
        .then(r=>r.json())
        .then(data=>setWorkouts(data))
        }
      ,[])

    return(
        //Full dashboard page that contains the high level stats, individual workouts for a single user, and an "Add Workout" button.
        <div>
            <h1>Dashboard</h1>
            <DashStats />
            <p>StatsPro</p>
            <p>Logout</p>
            <hr/>
            <div>
                <p>Add a new workout</p>
                <button>+</button>
            </div>
            <WorkoutList workouts={workouts}/>
        </div>
    )
}

export default Dashboard