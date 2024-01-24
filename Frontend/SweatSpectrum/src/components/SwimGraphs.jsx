import {useState, useEffect} from "react"
import {Chart as ChartJS} from "chart.js/auto"
import {Bar} from "react-chartjs-2"

function SwimGraphs({userWorkouts}){

    //Get all a users swim dates
    const getSwimWorkoutDates = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Swim")
            return workout.date
        })
    })

    //Combine all dates into one array
    let swimWorkoutDates = getSwimWorkoutDates.flat()
    //Remove undefined values from swimWorkoutDates
    swimWorkoutDates = swimWorkoutDates.filter(function (dates) {
        return dates != undefined;
    }
    )

    //Get all a users swim laps
    const getSwimWorkoutLaps = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Swim")
            return workout["attributes"].laps
        }
        )
    })

    //Combine all laps into one array
    let swimWorkoutLaps = getSwimWorkoutLaps.flat()
    //Remove undefined values from swimWorkoutLaps
    swimWorkoutLaps = swimWorkoutLaps.filter(function (laps) {
        return laps != undefined;
    }
    )

    //Get all a users swim durations
    const getSwimWorkoutDuration = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Swim")
            return workout.duration
        }
        )
    })

    //Combine all durations into one array
    let swimWorkoutDuration = getSwimWorkoutDuration.flat()
    //Remove undefined values from swimWorkoutDuration
    swimWorkoutDuration = swimWorkoutDuration.filter(function (duration) {
        return duration != undefined;
    }
    )
    //Convert swimWorkoutDuration from hours:minutes:seconds to minutes
    swimWorkoutDuration = swimWorkoutDuration.map(function (duration) {
        let parts = duration.split(':');
        let hours = parseInt(parts[0], 10);
        let minutes = parseInt(parts[1], 10);
        return String((hours * 60) + minutes);
    });


    
    return(
        <>
        <h2>Swims</h2>
            <div className="swim-chart chart-area">
                <article className="distance"> 
                    <Bar 
                        data={{
                            labels: swimWorkoutDates,
                            datasets: [ 
                                {
                                    label: "Laps",
                                    data: swimWorkoutLaps,
                                },

                            ],
                        }}
                    />
                </article>
            </div>

            <div className="swim-chart chart-area">
                <article className="hr"> 
                    <Bar 
                        data={{
                            labels: swimWorkoutDates,
                            datasets: [ 
                                {
                                    label: "Duration in Minutes",
                                    data: swimWorkoutDuration,
                                },

                            ],
                        }}
                    />
                </article>
            </div>
        </>
    )
}

export default SwimGraphs;