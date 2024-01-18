import DashStats from "./dash_stats"
import WorkoutList from "./dash_workouts"

function Dashboard(){
    return(
        <div>
            <h1>Dashboard</h1>
            <DashStats />
            <WorkoutList />
        </div>
    )
}

export default Dashboard