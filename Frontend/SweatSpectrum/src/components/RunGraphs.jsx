import {Chart as ChartJS} from "chart.js/auto"
import {Bar} from "react-chartjs-2"



function RunGraphs({userWorkouts}){

    // +++++++++++++++++++++++ RUNNING DATES +++++++++++++++++++++++

    //Get all a users run dates

    const getRunWorkoutDates = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Run")
            return workout.date
        })
    })

    //Combine all dates into one array
    let runWorkoutDates = getRunWorkoutDates.flat()
    //Remove undefined values from runWorkoutDates
    runWorkoutDates = runWorkoutDates.filter(function (dates) {
        return dates != undefined;
    }
    )
    
    // +++++++++++++++++++++++ RUNNING DISTANCES +++++++++++++++++++++++

    //Get all a users run distances
    const getRunWorkoutDistances = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Run")
            return workout["attributes"].distance
        })
    })

    //Combine all distances into one array
    let runWorkoutDistances = getRunWorkoutDistances.flat()
    //Remove undefined values from runWorkoutDistances
    runWorkoutDistances = runWorkoutDistances.filter(function (distances) {
        return distances != undefined;
    }
    )

    // +++++++++++++++++++++++ RUNNING AVG HR +++++++++++++++++++++++
    //Get average heart rate for runs 
    const getRunWorkoutAvgHR = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Run")
            return workout["attributes"]["avg heart rate"]
        })
    })

    //Combine all avg heart rates into one array
    let runWorkoutAvgHR = getRunWorkoutAvgHR.flat()
    //Remove undefined values from runWorkoutAvgHR
    runWorkoutAvgHR = runWorkoutAvgHR.filter(function (avgHR) {
        return avgHR != undefined;
    }
    )

    // +++++++++++++++++++++++ RUNNING MAX HR +++++++++++++++++++++++

    //Get max heart rate for runs
    const getRunWorkoutMaxHR = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Run")
            return workout["attributes"]["max heart rate"]
        })
    })

    //Combine all max heart rates into one array
    let runWorkoutMaxHR = getRunWorkoutMaxHR.flat()
    //Remove undefined values from runWorkoutMaxHR
    runWorkoutMaxHR = runWorkoutMaxHR.filter(function (maxHR) {
        return maxHR != undefined;
    }
    )

    return (
        <>
        <div className="stats-section">
        <h2>Runs</h2>
        <hr/>
        <h4>Distance</h4>
        <div className="run-chart chart-area">
            <article className="distance"> 
                <Bar 
                    data={{
                        labels: runWorkoutDates,
                        datasets: [ 
                            {
                                label: "Distance",
                                data: runWorkoutDistances,
                            },

                        ],
                    }}
                />
            </article>
        </div>
        
        <h4>Heart Rate</h4>
        <div className="run-chart chart-area">
            <article className="hr"> 
                <Bar 
                    data={{
                        labels: runWorkoutDates,
                        datasets: [ 
                            {
                                label: "Avg. Heart Rate",
                                data: runWorkoutAvgHR,
                            },
                            {
                                label: "Max. Heart Rate",
                                data: runWorkoutMaxHR,
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

export default  RunGraphs;