function WorkoutPost({workout}){
    return(
        <>
        <article>
            <h2>{workout.type}</h2>
            <p>Attributes: {workout.attributes}</p>
            <p>Date: {workout.date}</p>
            <p>Duration: {workout.duration}</p>
            <p>id: {workout.id}</p>
            <p>Time: {workout.time}</p>
            <p>Type: {workout.type}</p>
        </article>
        </>
    )

}

export default WorkoutPost;