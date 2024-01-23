import WorkoutPost from "./WorkoutPost";
import { useEffect, useState } from "react";
import NewWorkoutForm from "./NewWorkoutForm";
import { useNavigate } from 'react-router-dom';

function WorkoutList({ user }) {
  const [allSets, setAllSets] = useState([]);

  useEffect(() => {
    const getUserSets = () => {
      fetch(`/api/users/${user?.id}/workouts`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          setAllSets(data)
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
      {allSets.map(set => (
        <div key={set.set_id}>
          <button onClick={() => handleButtonClick(set.set_id)} role="button" className="contrast" style={{ width: '20%' }}>
            Add New Workout for Set {set.set_id}
          </button>
          <h2>Set Name: {set.set_id}</h2>
          {set.workouts.map(workout => (
            <WorkoutPost key={workout.id} workout={workout} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default WorkoutList;
