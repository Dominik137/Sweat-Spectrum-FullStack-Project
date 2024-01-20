function WorkoutPost({workout}){
    return(
        <>
            <p>Attributes: {workout.attributes}</p>
            <p>Date: {workout.date}</p>
            <p>Duration: {workout.duration}</p>
            <p>id: {workout.id}</p>
            <p>Time: {workout.time}</p>
            <p>Type: {workout.type}</p>
        </>
    )

}

export default WorkoutPost;