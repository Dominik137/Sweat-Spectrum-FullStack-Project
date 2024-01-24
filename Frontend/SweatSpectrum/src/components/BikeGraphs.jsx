import {Chart as ChartJS} from "chart.js/auto"
import {Bar} from "react-chartjs-2"

function BikeGraphs({userWorkouts}){

    //Get all a users bike dates

    const getBikeWorkoutDates = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Bike")
            return workout.date
        }
        )
    })

    //Combine all dates into one array
    let bikeWorkoutDates = getBikeWorkoutDates.flat()
    //Remove undefined values from bikeWorkoutDates
    bikeWorkoutDates = bikeWorkoutDates.filter(function (dates) {
        return dates != undefined;
    }
    )

    //Get all a users bike distances
    const getBikeWorkoutDistances = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Bike")
            return workout["attributes"].distance
        }
        )
    })

    //Combine all distances into one array
    let bikeWorkoutDistances = getBikeWorkoutDistances.flat()
    console.log(bikeWorkoutDistances)
    //Remove undefined values from bikeWorkoutDistances
    bikeWorkoutDistances = bikeWorkoutDistances.filter(function (distances) {
        return distances != undefined;
    }
    )

    //Get elevation gains for bike rides
    const getBikeWorkoutElevationGain = userWorkouts.map((userWorkout) => {
        return userWorkout.workouts.map((workout) => {
            if (workout.type == "Bike")
            return workout["attributes"]["elevation gain"]
        }
        )
    })

    //Combine all elevation gains into one array
    let bikeWorkoutElevationGain = getBikeWorkoutElevationGain.flat()
    //Remove undefined values from bikeWorkoutElevationGain
    bikeWorkoutElevationGain = bikeWorkoutElevationGain.filter(function (elevationGain) {
        return elevationGain != undefined;
    }
    )




    return(
        <>
        <div className="stats-section">
        <h2>Bike Rides</h2>
        <hr/>
        <h4>Distance</h4>

        <div className="bike-chart chart-area">
            <article className="distance"> 
                <Bar 
                    data={{
                        labels: bikeWorkoutDates,
                        datasets: [ 
                            {
                                label: "Distance",
                                data: bikeWorkoutDistances,
                            },

                        ],
                    }}
                />
            </article>
        </div>

        <h4>Elevation Gain</h4>
        <div className="bike-chart chart-area">
            <article className="hr"> 
                <Bar 
                    data={{
                        labels: bikeWorkoutDates,
                        datasets: [ 
                            {
                                label: "Elevation Gain",
                                data: bikeWorkoutElevationGain,
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

export default BikeGraphs