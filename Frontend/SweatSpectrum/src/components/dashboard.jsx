import DashStats from "./dash_stats"
import WorkoutList from "./dash_workouts"

function Dashboard(){
    return(
        //Full dashboard page that contains the high level stats, individual workouts for a single user, and an "Add Workout" button.
        <div>
            <h1>Dashboard</h1>
            <DashStats />
            <WorkoutList />
        </div>
    )
}

export default Dashboard