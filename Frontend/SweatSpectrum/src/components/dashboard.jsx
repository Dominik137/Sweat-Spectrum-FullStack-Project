import DashStats from "./DashStats"
import WorkoutList from "./DashWorkouts"
import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';

function Dashboard({user}){
   
   
  const navigate = useNavigate();

  const handleAddNewSet = () => {
    // Navigate to the '/new-set' route with a set ID of 0
    navigate('/new-set');
  };


  const [userWorkouts, setUserWorkouts] = useState([])

  useEffect(() => {
    if (user) {
      fetch(`/api/users/${user.id}/workouts`)
        .then(r => r.json())
        .then(data => setUserWorkouts(data))
    }
  }, [user]);



  return (
    <div className="grid">

        <div>
          <h1>Dashboard</h1>
          <DashStats userWorkouts={userWorkouts} />
          <hr />
        </div>
        <div>
          <h1>Add a new Set</h1>
          <button onClick={handleAddNewSet} role="button" style={{ width: '20%' }} className="contrast">
            Add New Set
          </button>
        
     
      <details>
        <summary role="button" className="contrast">
          Sets
        </summary>
        <WorkoutList user={user} />
      </details>
      </div>
    </div> 
    
  );
}
    
export default Dashboard