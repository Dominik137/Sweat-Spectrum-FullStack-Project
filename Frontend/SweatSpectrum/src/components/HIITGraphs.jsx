import {Chart as ChartJS} from "chart.js/auto"
import {Bar} from "react-chartjs-2"

function HIITGraphs({userWorkouts}){

    //Get all a users HIIT dates
    const getHIITWorkoutDates = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "HIIT")
            return workout.date
        }
        )
    })
    console.log(getHIITWorkoutDates)

    return(
        <>
        <h2>HIIT</h2>
        <div className="HIIT-chart chart-area">
            <article className="distance"> 
                <Bar 
                    data={{
                        labels: [1,2,3],
                        datasets: [ 
                            {
                                label: "Distance",
                                data: [1,2,3],
                            },

                        ],
                    }}
                />
            </article>
        </div>

        <div className="HIIT-chart chart-area">
            <article className="hr"> 
                <Bar 
                    data={{
                        labels: [1,2,3],
                        datasets: [ 
                            {
                                label: "Avg. Heart Rate",
                                data: [1,2,3],
                            },


                        ],
                    }}
                />
            </article>
        </div>
        </>
    )
}

export default HIITGraphs