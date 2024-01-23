import WorkoutPost from "./WorkoutPost";
import { useEffect, useState } from "react";
import NewWorkoutForm from "./NewWorkoutForm";
import { useNavigate } from 'react-router-dom';

function WorkoutList({ user }) {
    const [workouts, setWorkouts] = useState([]);
    const [setIds, setSetIds] = useState([]);
    const [allSets, setAllSets] = useState([]);
  
    useEffect(() => {
      const getUserSets = () => {
        fetch(`/api/users/${user?.id}/workouts`, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(data => {
            setAllSets(data)
            // setSetIds(data[0]?.set_ids || []);
            // setWorkouts(data[1] || []);
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
    // return (
    //   <div>
    //     {allSets.map(set => {
    //       console.log(set)
    //       return(
    //         <div>
    //           <h2>{set.set_id}</h2>
    //           {set.workouts.map(workout => {
    //             console.log(workout)
    //             return(
    //               <div>
    //                 <p>{workout.type}</p>
    //                 <p>{workout.duration}</p>
    //                 <p>{workout.date}</p>
    //               </div>
    //             )
    //           })}
    //         </div>

    //       )
    //     })}
    //   </div>
    // )
    return (
      <div>

        
        {workouts.map((set, index) => (
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