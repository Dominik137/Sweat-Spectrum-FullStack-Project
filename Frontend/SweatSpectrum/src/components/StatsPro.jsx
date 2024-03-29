import Analytics from "./Analytics"
import {useState, useEffect} from "react"
import {Chart as ChartJS} from "chart.js/auto"
import {Bar} from "react-chartjs-2"
import RunGraphs from "./RunGraphs"
import SwimGraphs from "./SwimGraphs"
import BikeGraphs from "./BikeGraphs"
import WeightGraphs from "./WeightGraphs"
import HIITGraphs from "./HIITGraphs"

function StatsPro({user}){
    const [userWorkouts, setUserWorkouts] = useState([])

    useEffect(() => {
        if (user) {
        fetch(`/api/users/${user.id}/workouts`)
            .then(r => r.json())
            .then(data => setUserWorkouts(data))
        }
    }, [user]);

    function hasWorkoutType(type) {
        return userWorkouts.some(userWorkout => 
            userWorkout.workouts.some(workout => workout.type == type)
        );
    }

    return(
        //This is the page that will display the graphs for the different workout types a user has logged, as well as link to detailed breakdown per workout type.
        <div>
            <h1>StatsPro</h1>

            {hasWorkoutType("Run") ? <RunGraphs userWorkouts={userWorkouts}/> : <></>}
            {hasWorkoutType("Swim") ? <SwimGraphs userWorkouts={userWorkouts}/> : <></>}
            {hasWorkoutType("Bike") ? <BikeGraphs userWorkouts={userWorkouts}/> : <></>}
            {hasWorkoutType("Weight Training") ? <WeightGraphs userWorkouts={userWorkouts}/> : <></>}
            {hasWorkoutType("HIIT") ? <HIITGraphs userWorkouts={userWorkouts}/> : <></>}
        
        </div>
    )
}

export default StatsPro 