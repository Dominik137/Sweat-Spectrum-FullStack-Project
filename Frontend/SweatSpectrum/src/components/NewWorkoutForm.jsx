import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function NewWorkoutForm({ user }) {
  const location = useLocation();
  const setIds = location.state?.setIds || [];
  const [workoutDetails, setWorkoutDetails] = useState({
    type: "",
    duration: "",
    date: "",
    time: "",
    attributes: "",
  });

  const navigate = useNavigate(); // Use the useNavigate hook

  function handleChange(event) {
    const { name, value } = event.target;
    setWorkoutDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  }

  function postNewWorkout() {
    // Check if the workout type is provided before posting
    if (!workoutDetails.type) {
      alert("Please provide a workout type.");
      return;
    }

    const attributesObject = { testing: "test" };
    const formData = {
      type: workoutDetails.type,
      duration: workoutDetails.duration,
      date: workoutDetails.date,
      time: workoutDetails.time,
      attributes: JSON.stringify(attributesObject),
    };

    fetch(`/api/new_workout/${user.id}/${setIds}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success
        console.log("New workout posted successfully:", data);
        navigate('/dashboard'); // Navigate to the dashboard
      })
      .catch((error) => {
        // Handle error
        console.error("Error posting new workout:", error);
      });
  }

  return (
    <div>
      <h2>New Workout Form</h2>
      <p>Set IDs: {setIds}</p>
      <form>
        <label>
          Workout Type:
          <input
            type="text"
            name="type"
            value={workoutDetails.type}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Duration:
          <input
            type="text"
            name="duration"
            value={workoutDetails.duration}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Date:
          <input
            type="text"
            name="date"
            value={workoutDetails.date}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Time:
          <input
            type="text"
            name="time"
            value={workoutDetails.time}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Attributes:
          <input
            type="text"
            name="attributes"
            value={workoutDetails.attributes}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={postNewWorkout}>
          Post New Workout
        </button>
      </form>
    </div>
  );
}

export default NewWorkoutForm;
