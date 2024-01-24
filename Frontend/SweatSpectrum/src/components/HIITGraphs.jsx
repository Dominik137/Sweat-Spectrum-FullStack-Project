import {Chart as ChartJS} from "chart.js/auto"
import {Bar, Radar} from "react-chartjs-2"

function HIITGraphs({userWorkouts}){

    //Get all a users HIIT dates
    const HIITWorkoutDates = userWorkouts.flatMap((userWorkout) => {
        return userWorkout.workouts
            .filter((workout) => workout.type == "HIIT")
            .map((workout) => workout.date);
    });


    //Get all a users HIIT warmups
    const getHIITWorkoutWarmups = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "HIIT")
            return workout["attributes"]["warm up"]
        }
        )
    })

    //Combine all warmups into one array
    let HIITWorkoutWarmups = getHIITWorkoutWarmups.flat()
    //Remove undefined values from HIITWorkoutWarmups
    HIITWorkoutWarmups = HIITWorkoutWarmups.filter(function (warmups) {
        return warmups != undefined;
    }
    )

    //Get all a users HIIT cooldowns
    const getHIITWorkoutCooldowns = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "HIIT")
            return workout["attributes"]["cool down"]
        }
        )
    })

    //Combine all cooldowns into one array
    let HIITWorkoutCooldowns = getHIITWorkoutCooldowns.flat()
    //Remove undefined values from HIITWorkoutCooldowns
    HIITWorkoutCooldowns = HIITWorkoutCooldowns.filter(function (cooldowns) {
        return cooldowns != undefined;
    }
    )

    //Get average heart rate for HIIT
    const HIITWorkoutActiveCal = userWorkouts.flatMap((userWorkout) => {
        return userWorkout.workouts
            .filter((workout) => workout.type == "HIIT")
            .map((workout) => workout["attributes"]["active calories"]);
    });


    //Get max heart rate for HIIT
    const HIITWorkoutTotalCal = userWorkouts.flatMap((userWorkout) => {
        return userWorkout.workouts
            .filter((workout) => workout.type == "HIIT")
            .map((workout) => workout["attributes"]["total calories"]);
    });



    return(
        <>
        <div className="stats-section">
        <h2>HIIT</h2>
        <hr/>
        <h4>Calorie Burn</h4>
        {/* <div className="HIIT-chart chart-area">
            <article className="distance"> 
                <Radar 
                    data={{
                        labels: ["Stretch", "Jog", "Run", "Meditate", "Cry", "Sobbing"],
                        datasets: [ 
                            {
                                label: "HIIT Warmups",
                                data: [10, 12, 15, 11, 40, 12],
                                fill: true,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgb(255, 99, 132)',
                                pointBackgroundColor: 'rgb(255, 99, 132)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgb(255, 99, 132)'
                            },
                            {
                                label: "HIIT Cooldowns",
                                data: [20, 16, 4, 9, 5, 10],
                                fill: true,
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                borderColor: 'rgb(54, 162, 235)',
                                pointBackgroundColor: 'rgb(54, 162, 235)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgb(54, 162, 235)'
                            },

                        ],
                    }}
                />
            </article>
        </div> */}

        <div className="HIIT-chart chart-area">
            <article className="hr"> 
                <Bar 
                    data={{
                        labels: HIITWorkoutDates,
                        datasets: [ 
                            {
                                label: "Active Calories",
                                data: HIITWorkoutActiveCal,
                            },
                            {
                                label: "Total Calories",
                                data: HIITWorkoutTotalCal,
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

export default HIITGraphs