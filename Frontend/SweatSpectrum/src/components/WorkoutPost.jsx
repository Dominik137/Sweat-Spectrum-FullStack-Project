function WorkoutPost({workout}){
    console.log(workout)
    
    const attributes = workout.attributes || {};

    return(
        <>
        <article>
            <h2>{workout.type}</h2>
            <details >
            <summary role="button" class="secondary" style={{ width: '50%' }}>Stats</summary>
            <ul>
            {Object.entries(workout.attributes).map(([attribute, value]) => (
              <li key={attribute}>
                {attribute}: {value}
                {/* loops thru all the attributes and adds them to each workout */}
              </li>
            ))}
            </ul>
            </details>
            <p>Date: {workout.date}</p>
            <p>Duration: {workout.duration}</p>
            <p>id: {workout.id}</p>
            <p>Time: {workout.time}</p>
        </article>
        </>
    )

}

export default WorkoutPost;