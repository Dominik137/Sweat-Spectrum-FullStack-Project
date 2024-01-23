function DashStats({userWorkouts}){

    console.log(userWorkouts);
    // console.log(userWorkouts[0])

    const displayWorkoutStats = userWorkouts.map((userWorkout) => {
        console.log(userWorkout)
            userWorkout.workouts.map((workoutObj) => {
                console.log(workoutObj)
            }
            )
    })
        //   workoutObj.workouts.map((workout) => 
        //     workout.attributes["active calories"]
        //   )
        // )
    //   );

    // console.log(displayWorkoutStats);

    return(
        <>
        {/* {displayWorkoutStats */}
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