import {useState, useEffect} from "react"
import {Chart as ChartJS} from "chart.js/auto"
import {Bar} from "react-chartjs-2"

function SwimGraphs({userWorkouts}){
    
    return(
        <>
        <h2>Swims</h2>
            <div className="swim-chart chart-area">
                <article className="distance"> 
                    <Bar 
                        data={{
                            labels: ["2024-01-02", "2024-01-12", "2024-01-23"],
                            datasets: [ 
                                {
                                    label: "Distance",
                                    data: [9.5, 3.5, 10.5],
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

export default SwimGraphs;