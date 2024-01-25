import {Chart as ChartJS} from "chart.js/auto"
import {Bar} from "react-chartjs-2"

function WeightGraphs({userWorkouts}){

    // +++++++++++++++++++++++ WEIGHT DATES +++++++++++++++++++++++

    //Get all a users weight dates
    const getWeightWorkoutDates = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Weight Training")
                return workout.date
        }
        )
    })

    //Combine all dates into one array
    let weightWorkoutDates = getWeightWorkoutDates.flat()
    //Remove undefined values from weightWorkoutDates
    weightWorkoutDates = weightWorkoutDates.filter(function (dates) {
        return dates != undefined;
    }
    )

        // +++++++++++++++++++++++ WEIGHT WEIGHTS +++++++++++++++++++++++

    //Get all a users weights 
    const getWeightWorkoutWeights = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Weight Training")
                return workout["attributes"].weight
        }
        )
    })

    //Combine all weights into one array
    let weightWorkoutWeights = getWeightWorkoutWeights.flat()
    //Remove undefined values from weightWorkoutWeights
    weightWorkoutWeights = weightWorkoutWeights.filter(function (weights) {
        return weights != undefined;
    }
    )

    // +++++++++++++++++++++++ WEIGHT SETS +++++++++++++++++++++++

    //Get all a users weight training sets
    const getWeightWorkoutSets = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Weight Training")
                return workout["attributes"].sets
        }
        )
    })

    //Combine all sets into one array
    let weightWorkoutSets = getWeightWorkoutSets.flat()
    //Remove undefined values from weightWorkoutSets
    weightWorkoutSets = weightWorkoutSets.filter(function (sets) {
        return sets != undefined;
    }
    )

    // +++++++++++++++++++++++ WEIGHT REPS +++++++++++++++++++++++

    //Get all a users weight training reps
    const getWeightWorkoutReps = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Weight Training")
                return workout["attributes"].reps
        }
        )
    })

    //Combine all reps into one array
    let weightWorkoutReps = getWeightWorkoutReps.flat()
    //Remove undefined values from weightWorkoutReps
    weightWorkoutReps = weightWorkoutReps.filter(function (reps) {
        return reps != undefined;
    }
    )

    // +++++++++++++++++++++++ WEIGHT AVG HR +++++++++++++++++++++++

    //Get average heart rate for weight training
    const getWeightWorkoutAvgHR = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Weight Training")
                return workout["attributes"]["avg heart rate"]
        }
        )
    })

    //Combine all avg heart rates into one array
    let weightWorkoutAvgHR = getWeightWorkoutAvgHR.flat()
    //Remove undefined values from weightWorkoutAvgHR
    weightWorkoutAvgHR = weightWorkoutAvgHR.filter(function (avgHR) {
        return avgHR != undefined;
    }
    )

    // +++++++++++++++++++++++ WEIGHT MAX HR +++++++++++++++++++++++

    //Get max heart rate for weight training
    const getWeightWorkoutMaxHR = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Weight Training")
                return workout["attributes"]["max heart rate"]
        }
        )
    })

    //Combine all max heart rates into one array
    let weightWorkoutMaxHR = getWeightWorkoutMaxHR.flat()
    //Remove undefined values from weightWorkoutMaxHR
    weightWorkoutMaxHR = weightWorkoutMaxHR.filter(function (maxHR) {
        return maxHR != undefined;
    }
    )

    return(
        <>
        <div className="stats-section">
        <h2>Weight Training</h2>
        <hr/>
        <h4>Weight Loads</h4>
        <div className="weight-chart chart-area">
            <article className="distance"> 
                <Bar 
                    data={{
                        labels: weightWorkoutDates,
                        datasets: [ 
                            {
                                label: "Weight",
                                data: weightWorkoutWeights,
                            },
                            {
                                label: "Reps",
                                data: weightWorkoutReps,
                            },
                            {
                                label: "Sets",
                                data: weightWorkoutSets,
                            },

                        ],
                    }}
                />
            </article>
        </div>

        <h4>Heart Rate</h4>
        <div className="weight-chart chart-area">
            <article className="hr"> 
                <Bar 
                    data={{
                        labels: weightWorkoutDates,
                        datasets: [ 
                            {
                                label: "Avg. Heart Rate",
                                data: weightWorkoutAvgHR,
                            },
                            {
                                label: "Max. Heart Rate",
                                data: weightWorkoutMaxHR,
                            },


                        ],
                    }}
                />
            </article>
        </div>
        </div>
        </>
    )
}

export default WeightGraphs