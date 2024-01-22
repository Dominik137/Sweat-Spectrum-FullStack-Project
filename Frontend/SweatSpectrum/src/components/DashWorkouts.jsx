import { data } from "autoprefixer"
import WorkoutPost from "./WorkoutPost";
import { useEffect, useState } from "react";

function WorkoutList({ user }) {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const getUserSets = () => {
      fetch(`/api/users/${user?.id}/workouts`, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setWorkouts(data);
        })
        .catch(error => {
          console.error('Error fetching workouts:', error);
        });
    };

    getUserSets();
  }, [user]);

  

  return (
    <div>
    {workouts?.map(set => (
      <div key={set.id}>
        <h2>"Set Name"{set.id}</h2>
        <button role="button" class="contrast" style={{ width: '20%' }}>Add New wrokout</button>
        <ul>
          {set.map(workout => (
            <WorkoutPost key={workout.id} workout={workout} />
          ))}
        </ul>
        
      </div>
    ))}
  </div>
);
}


export default WorkoutList;
