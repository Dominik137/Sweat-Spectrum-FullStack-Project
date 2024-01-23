function DashStats({userWorkouts}){


    // ++++++++++++++++++ TOP WORKOUT ++++++++++++++++++++++++

    
    // ++++++++++++++++++ CALORIES ++++++++++++++++++++++++ 
    // Create a function to get all a users active calories from their workouts
    const getActiveCals = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            return workout.attributes["active calories"]
        })
    })
    // Combine the multiple arrays of active calories into one array
    const activeCals = [].concat.apply([], getActiveCals)

    // Create a function to get all a users total calories from their workouts and divide by the array length (avg)
    function getAverage(array) {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += parseInt(array[i]) //don't forget to add the base
        }
        return sum / array.length;
    }

    // Create variable to store average calorie burn for use on page
    let averageCalorieBurn = getAverage(activeCals)


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
                <p>{averageCalorieBurn}</p>
                <p>Avg Calorie Burn</p>
            </article>

        </div>
        
        </>
    )
}

export default DashStats