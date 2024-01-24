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

  const handleDelete = (setId, workoutId) => {
    fetch(`/api/users/${user?.id}/workouts/${workoutId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // Update local state by filtering out the deleted workout
          setAllSets(prevSets => {
            const updatedSets = prevSets.map(set => {
              if (set.set_id === setId) {
                return {
                  ...set,
                  workouts: set.workouts.filter(workout => workout.id !== workoutId)
                };
              }
              return set;
            });

            // Filter out sets with 0 workouts
            return updatedSets.filter(set => set.workouts.length > 0);
          });
        } else {
          // Handle error, e.g., show an error message
        }
      })
      .catch(error => {
        console.error('Error deleting workout:', error);
      });
  };

  return (
    <div>
      {allSets.map(set => (
        <div key={set.set_id}>
          <details >
          <summary role="button">Set Name: {set.set_id}</summary>
          <button onClick={() => handleButtonClick(set.set_id)} role="button" className="contrast" style={{ width: '20%' }}>
            Add New Workout for Set {set.set_id}
          </button>
          
          <h2>Set Name: {set.set_id}</h2>
          
          {set.workouts.map(workout => (
            <WorkoutPost
              key={workout.id}
              user={user}
              workout={workout}
              handleDelete={() => handleDelete(set.set_id, workout.id)}
            />
          ))}
          </details>
        </div>
      ))}
    </div>
  );
}

export default WorkoutList;
