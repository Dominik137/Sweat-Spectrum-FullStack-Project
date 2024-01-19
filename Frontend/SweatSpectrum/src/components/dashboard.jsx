import DashStats from "./DashStats"
import WorkoutList from "./DashWorkouts"

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