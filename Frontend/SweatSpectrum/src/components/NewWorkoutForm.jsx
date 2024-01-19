function NewWorkoutForm(){

    return(
        <div>
            <h1>New Workout Form</h1>
            <p>Workout Date: saveto: user_workouts.date</p>
            <p>Workout Time: saveto: user_workouts.time</p>
            <p>Workout Duration: saveto: user_workouts.duration</p>
            <p>❗ The above data should save to the USER WORKOUT TABLE, which will be associated with the below data in WORKOUT</p>
            <hr/>
            <p>Workout type: saveto: workout.type</p>
            <p>Workout Attributes: saveto: workout.attr</p>
        </div>
    )
}

export default NewWorkoutForm