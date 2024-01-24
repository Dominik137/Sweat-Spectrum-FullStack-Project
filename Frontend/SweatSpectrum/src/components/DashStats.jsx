function DashStats({userWorkouts}){

    // ++++++++++++++++++++++++++++++++++++ DAILY STREAK ++++++++++++++++++++++++++++++++++++++++++

    // Function to get all a users workout dates from their workouts
    const getWorkoutDates = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            return workout.date
        })
    })

    // Combine the multiple arrays of workout dates into one array
    const workoutDates = [].concat.apply([], getWorkoutDates)

    // Function to get the longest daily streak from an array of dates
    function getDailyStreak(array) {
        // Remove duplicates and sort the array
        const sortedDates = Array.from(new Set(array)).sort();

        // Convert strings to Date objects
        const dateObjects = sortedDates.map(dateStr => new Date(dateStr));

        let longestStreak = 0;
        let currentStreak = 1;

        for (let i = 0; i < dateObjects.length - 1; i++) {
            // Calculate the difference in days between the current date and the next one
            const diffInDays = Math.round((dateObjects[i + 1] - dateObjects[i]) / (1000 * 60 * 60 * 24));

            if (diffInDays === 1) {
                // If the next date is the day after the current one, increment the streak
                currentStreak++;
            } else if (diffInDays > 1) {
                // If the next date is not the day after the current one, reset the streak
                currentStreak = 1;
            }

            // Update the longest streak
            longestStreak = Math.max(longestStreak, currentStreak);
        }

        return longestStreak;
    }

    // Create variable to store daily streak for rendering on page
   let dailyStreak = getDailyStreak(workoutDates)


    // ++++++++++++++++++++++++++++++++++++ MOST COMMON WORKOUT ++++++++++++++++++++++++++++++++++++++++++

    // Function to get all of a users workout types from their workouts
    const getTopWorkout = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            return workout.type
        })
    })

    // Combine the multiple arrays of workout types into one array
    const topWorkout = [].concat.apply([], getTopWorkout)


    // Function to get the most common workout type - NOTE: Currently doesn't work if there's not a "top" workout
    function mostCommonWorkout(workouts) {
        if (workouts.length === 0) {
            return "Log More Workouts";
        }
    
        let counts = {};
        let maxCount = 0;
        let mostCommonWorkout = "";
    
        for (let i = 0; i < workouts.length; i++) {
            let workout = workouts[i];
            if (!counts[workout]) {
                counts[workout] = 1;
            } else {
                counts[workout]++;
            }
    
            if (counts[workout] > maxCount) {
                maxCount = counts[workout];
                mostCommonWorkout = workout;
            }
        }
    
        return mostCommonWorkout;
    }

    // Create variable to store most common workout type for rendering on page
    let topWorkoutType = mostCommonWorkout(topWorkout)

    // Function to return an emoji based on the top workout type
    function workoutEmoji(topWorkoutType) {
        if (topWorkoutType == "Weight Training") {
            let topWorkoutEmoji = <span>🏋️‍♂️</span>
            return topWorkoutEmoji
        }
        else if (topWorkoutType == "HIIT") {
            let topWorkoutEmoji = <span>🥵</span>
            return topWorkoutEmoji
        }
        else if (topWorkoutType == "Run") {
            let topWorkoutEmoji = <span>🏃</span>
            return topWorkoutEmoji
        }
        else if (topWorkoutType == "Bike") {
            let topWorkoutEmoji = <span>🚴</span>
            return topWorkoutEmoji
        }
        else if (topWorkoutType == "Swim") {
            let topWorkoutEmoji = <span>🏊</span>
            return topWorkoutEmoji
        }
        else {
            let topWorkoutEmoji = <span>🤷‍♂️</span>
            return topWorkoutEmoji
        }
    }

    // Create variable to store emoji for rendering on page
    let topWorkoutEmoji = workoutEmoji(topWorkoutType)



    // ++++++++++++++++++++++++++++++++++++ AVG CALORIES ++++++++++++++++++++++++++++++++++++++++++ 

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
            //Handle if no calories entered in form 
            if (isNaN(array[i])) {
                continue;
            }
            sum += parseInt(array[i]) //don't forget to add the base
        }
        return sum / array.length;
    }

    // Create variable to store average calorie burn for rendering on page
    let averageCalorieBurn = getAverage(activeCals)


    return(
        <>
        <div className="basic-stats-container">

            <article className="daily-streak">
                <p className="statnum">{dailyStreak} Days</p>
                <p> Workout Streak 🗓️</p>
            </article>

            <article className="avg-calorie-burn">
                <p className="statnum">{Math.floor(averageCalorieBurn)}</p>
                <p>Avg Calorie Burn 🔥</p>
            </article>

           

        </div>
        <article className="top-weekly-workout">
                {/* <p> Log at least one workout...</p> */}
                <p className="statnum">{topWorkoutType}</p>
                <p>Most Common Workout {topWorkoutEmoji}</p>
        </article>
        <button className="more-stats">Get More Stats →</button>
        
        </>
    )
}

export default DashStats