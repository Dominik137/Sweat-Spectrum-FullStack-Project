import DashStats from "./DashStats"
import WorkoutList from "./DashWorkouts"
import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';

function Dashboard({user}){
   
   
  const navigate = useNavigate();
  const handleButtonClick = () => {
    // Navigate to the new workout form page
    navigate('/new-set'); 
  };

   


    return(
        //Full dashboard page that contains the high level stats, individual workouts for a single user, and an "Add Workout" button.
        <div className="grid">
            <div>
                <div>
                    <h1>Dashboard</h1>
                    <DashStats />
                    <p>StatsPro</p>
                    <p>Logout</p>
                    <hr/>
                </div>
                <div>
                <h2>Add a new Set</h2>
                <button onClick={handleButtonClick} role="button" style={{ width: '20%' }} class="contrast"> button</button>
                </div>
                </div>
                <details>
                <summary role="button" class="contrast">Sets</summary>
                <h2> <WorkoutList user={user}/></h2>
                </details>
           
            
          </div>
      
        
    )
    }
    
export default Dashboard