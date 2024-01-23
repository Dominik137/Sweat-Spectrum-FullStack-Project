function DashStats(){
    return(
        //High level dashboard stats go here - for a single user only, and can feature items like "Workout Day Streak" or "Most Workouts in a Week"
        <>
        <div className="basic-stats-container">

            <article className="daily-streak">
                <p>COMPARE SET DATES W CURRENT DATE</p>
                <p>Day Workout Streak</p>
            </article>

            <article className="top-weekly-workout">
                <p>SUM OF SETS CALORIES</p>
                <p>Your Top Workout</p>
            </article>

            <article className="avg-calorie-burn">
                <p>SUM ALL WORKOUTS.ACTIVECALORIES / NUM</p>
                <p>Avg Calorie Burn</p>
            </article>

        </div>
        
        </>
    )
}

export default DashStats