function DashStats(){
    return(
        //High level dashboard stats go here - for a single user only, and can feature items like "Workout Day Streak" or "Most Workouts in a Week"
        <>
        <div className="basic-stats-container">
            <div className="daily-streak">
                <p>Your workout streak is: 10 days in a row</p>
            </div>

            <div className="top-weekly-workout">
                <p>Your top workout this week was: Run</p>
            </div>

            <div className="avg-calorie-burn">
                <p>Your avg calorie burn this week is: 545 cal</p>
            </div>

        </div>
        
        </>
    )
}

export default DashStats