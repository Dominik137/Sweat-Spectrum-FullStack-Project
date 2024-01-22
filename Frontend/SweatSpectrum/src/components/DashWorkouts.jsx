import WorkoutPost from "./WorkoutPost"

function WorkoutList({workouts}){
   
    const displayWorkouts = workouts.map((workout)=>{
        return(
            <WorkoutPost key ={workout.id} workout={workout}/>
        )
    })
   
    return(
        //List of workouts on the dashboard goes here - for a single user only.

        
        // <>
        // <hr/>
        // <div className="master-workout-table">
        //     <div className="single-workout-row">
        //         <h2>Run</h2>
        //         <h4>Jan 19th (user.workout.date) 2:00pm (user.workout.time)</h4>
        //         <p>run.attr.jsonify attr NAME  |  run.attr.jsonify attr DATA</p>
        //         <p>run.attr.jsonify attr NAME  |  run.attr.jsonify attr DATA</p>
        //         <p>run.attr.jsonify attr NAME  |  run.attr.jsonify attr DATA</p>
        //         <p>run.attr.jsonify attr NAME  |  run.attr.jsonify attr DATA</p>
        //     </div>

        //     <div className="single-workout-row">
        //         <h2>Strength Training</h2>
        //         <h4>Jan 17th (user.workout.date) 1:00pm (user.workout.time)</h4>
        //         <p>strength.attr.jsonify attr NAME  |  strength.attr.jsonify attr DATA</p>
        //         <p>strength.attr.jsonify attr NAME  |  strength.attr.jsonify attr DATA</p>
        //         <p>strength.attr.jsonify attr NAME  |  strength.attr.jsonify attr DATA</p>
        //         <p>strength.attr.jsonify attr NAME  |  strength.attr.jsonify attr DATA</p>
        //     </div>
        // </div>
        // </>
        <div>
        {displayWorkouts}
        </div>
    );
}

export default WorkoutList;