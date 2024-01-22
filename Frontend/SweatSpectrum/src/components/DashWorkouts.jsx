import WorkoutPost from "./WorkoutPost";
import { useEffect, useState } from "react";
import NewWorkoutForm from "./NewWorkoutForm";
import { useNavigate } from 'react-router-dom';

function WorkoutList({ user }) {
    const [workouts, setWorkouts] = useState([]);
    const [setIds, setSetIds] = useState([]);
  
    useEffect(() => {
      const getUserSets = () => {
        fetch(`/api/users/${user?.id}/workouts`, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(data => {
            setSetIds(data[0]?.set_ids || []);
            setWorkouts(data[1] || []);
          })
          .catch(error => {
            console.error('Error fetching workouts:', error);
          });
      };
  
      getUserSets();
    }, [user]);
  
    const navigate = useNavigate();
  
    const handleButtonClick = (setIdValue) => {
      navigate('/new-workout', { state: { setIds: setIdValue } });
    };
  
    return (
      <div>
        {workouts?.map((set, index) => (
          <div key={setIds[index]}>
            <h2>"Set Name" {setIds[index]}</h2>
            <button onClick={() => handleButtonClick(setIds[index])} role="button" className="contrast" style={{ width: '20%' }}>Add New Workout</button>
            <ul>
              {set.workouts.map(workout => (
                <WorkoutPost key={workout.id} workout={workout} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  
  export default WorkoutList;