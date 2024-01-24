import {Chart as ChartJS} from "chart.js/auto"
import {Bar} from "react-chartjs-2"

function BikeGraphs({userWorkouts}){

    return(
        <>
        <h2>Bikes</h2>
        <div className="bike-chart chart-area">
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

        <div className="bike-chart chart-area">
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

export default BikeGraphs