import Analytics from "./Analytics"
import {useState, useEffect} from "react"
import {Chart as ChartJS} from "chart.js/auto"
import {Bar} from "react-chartjs-2"

function StatsPro({user}){
    const [userWorkouts, setUserWorkouts] = useState([])

    useEffect(() => {
      if (user) {
        fetch(`/api/users/${user.id}/workouts`)
          .then(r => r.json())
          .then(data => setUserWorkouts(data))
      }
    }, [user]);

    //All dates of user runs
    //All distances of user runs 



    return(
        //This is the page that will display the graphs for the different workout types a user has logged, as well as link to detailed breakdown per workout type.
        <div>
            <h1>StatsPro</h1>
            //Graphs go here
            <button> LINK TO ANALYTICS PAGE HERE</button>

            <h2>Runs</h2>
            <div className="run-chart chart-area">
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

        </div>
    )
}

export default StatsPro 