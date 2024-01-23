import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditWorkoutForm({ user }) {
  const params = useParams();
  const workoutId = params.id;
  const navigate = useNavigate();
  const [existingWorkout, setExistingWorkout] = useState(null);

  const [workoutDetails, setWorkoutDetails] = useState({
    type: '',
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: new Date().toISOString().split('T')[0], // Initialize date in 'YYYY-MM-DD' format
    time: '',
    attributes: {},
  });

  useEffect(() => {
    const fetchWorkoutDetails = async () => {
      try {
        const response = await fetch(`/api/users/${user?.id}/workouts/${workoutId}`);
        if (response.ok) {
          const data = await response.json();
          setExistingWorkout(data);
          setWorkoutDetails({
            type: data.type,
            hours: data.hours,
            minutes: data.minutes,
            seconds: data.seconds,
            date: new Date(data.date).toISOString().split('T')[0], // Format date from response
            time: data.time,
            attributes: data.attributes,
          });
        } else {
          // Handle error
          console.error('Failed to fetch workout details');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchWorkoutDetails();
  }, [user.id, workoutId]);

  const handlePatch = async () => {
    try {
      const response = await fetch(`/api/users/${user.id}/workouts/${workoutId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...workoutDetails,
          date: new Date(workoutDetails.date).toISOString().split('T')[0], // Format date before sending
        }),
      });

      if (response.ok) {
        // Handle successful update
        console.log('Workout updated successfully');
        navigate('/dashboard'); // Redirect to the dashboard or wherever you need
      } else {
        // Handle error
        console.error('Failed to update workout');
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  return (
    <div>
      <h2>Edit Workout</h2>
      <form>
        <label>Type:</label>
        <input
          type="text"
          value={workoutDetails.type}
          onChange={(e) => setWorkoutDetails({ ...workoutDetails, type: e.target.value })}
        />

        <label>Date:</label>
        <input
          type="date"
          value={workoutDetails.date}
          onChange={(e) => setWorkoutDetails({ ...workoutDetails, date: e.target.value })}
        />

        {/* Include other input fields for hours, minutes, seconds, time, etc. */}
        
        <button type="button" onClick={handlePatch}>
          Update Workout
        </button>
      </form>
    </div>
  );
}

export default EditWorkoutForm;
