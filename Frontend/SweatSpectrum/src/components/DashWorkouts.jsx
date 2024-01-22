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

  
//   mpa thorugh this

  return (
    <>
      <div>
       <h2>{workouts.id}</h2>
      </div>
    </>
  );
}

export default WorkoutList;
