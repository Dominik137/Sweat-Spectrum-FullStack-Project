import {Chart as ChartJS} from "chart.js/auto"
import {Bar} from "react-chartjs-2"



function RunGraphs({userWorkouts}){
//All dates of user runs
//All distances of user runs 

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


    return (
        <>
        <h2>Runs</h2>
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

        <div className="run-chart chart-area">
            <article className="hr"> 
                <Bar 
                    data={{
                        labels: ["2024-01-02", "2024-01-12", "2024-01-23"],
                        datasets: [ 
                            {
                                label: "Avg. Heart Rate",
                                data: [120, 130, 140],
                            },
                            {
                                label: "Max. Heart Rate",
                                data: [156, 164, 180],
                            },

                        ],
                    }}
                />
            </article>
        </div>
    
    </>
)
}

export default  RunGraphs;