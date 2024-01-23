import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TimePicker from 'react-time-picker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function NewWorkoutForm({ user }) {
  const location = useLocation();
  const setIds = location.state?.setIds || [];
  const [workoutDetails, setWorkoutDetails] = useState({
    type: "",
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: new Date(), // Default to today
    time: "",
    attributes: {},
  });

  const navigate = useNavigate();

  const workoutAttributes = {
    Run: ['distance', 'pace', 'active calories', 'total calories', 'avg heart rate', 'max heart rate', 'elevation gain', 'notes'],
    Bike: ['distance', 'pace', 'active calories', 'total calories', 'avg heart rate', 'max heart rate', 'elevation gain', 'notes'],
    Swim: ['type', 'stroke', 'distance', 'laps', 'active calories', 'total calories', 'avg heart rate', 'max heart rate', 'notes'],
    "Weight Training": ['muscle group', 'type', 'weight', 'reps', 'sets', 'active calories', 'total calories', 'avg heart rate', 'max heart rate', 'notes'],
    HIIT: ['intensity', 'rounds', 'warm up', 'cool down', 'muscle group', 'active calories', 'total calories', 'notes'],
  };

  function handleChange(event) {
    const { name, value } = event.target;
    const parsedValue = event.target.type === 'number' ? parseInt(value, 10) : value;
  
    if (name.includes('attributes.')) {
      const attributeName = name.split('.')[1];
      setWorkoutDetails((prevDetails) => ({
        ...prevDetails,
        attributes: {
          ...prevDetails.attributes,
          [attributeName]: parsedValue,
        },
      }));
    } else {
      setWorkoutDetails((prevDetails) => ({
        ...prevDetails,
        [name]: parsedValue,
      }));
    }
  }
  function postNewWorkout() {
    if (!workoutDetails.type) {
      alert("Please provide a workout type.");
      return;
    }
  
    // Validation: Check if minutes and seconds are valid
    if (workoutDetails.minutes < 0 || workoutDetails.minutes > 59 ||
      workoutDetails.seconds < 0 || workoutDetails.seconds > 59) {
      alert("Please enter valid minutes and seconds (0-59).");
      return;
    }
  
    const attributesObject = workoutDetails.attributes;
  
    const formattedHours = workoutDetails.hours.toString().padStart(2, '0');
    const formattedMinutes = workoutDetails.minutes.toString().padStart(2, '0');
    const formattedSeconds = workoutDetails.seconds.toString().padStart(2, '0');
  
    // Extract hours and minutes from the time input
    const match = workoutDetails.time.match(/^(\d{1,2}):(\d{1,2})\s*(AM|PM)?$/i);
  
    if (!match) {
      alert("Invalid time format. Please enter a valid time.");
      return;
    }
  
    const timeHours = parseInt(match[1], 10);
    const timeMinutes = match[2];
    const period = match[3] ? match[3].toUpperCase() : ''; // If AM/PM is not provided, it defaults to an empty string
  
    // Determine if it's AM or PM based on user input
    const periodValue = period && (period === 'PM' || period === 'AM') ? period : timeHours >= 12 ? 'PM' : 'AM';
  
    // Convert to 24-hour format
    const formattedHours24 = (timeHours % 12 + (periodValue === 'PM' ? 12 : 0)).toString().padStart(2, '0');
  
    // Format time as hh:mm:ss
    const formattedTime = `${formattedHours24}:${timeMinutes}:${formattedSeconds}`;
  
    const formData = {
      type: workoutDetails.type,
      duration: `${formattedHours}:${formattedMinutes}:${formattedSeconds}`,
      date: workoutDetails.date.toISOString().split('T')[0],
      time: formattedTime,
      attributes: JSON.stringify(attributesObject)
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
        console.log("New workout posted successfully:", data);
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error("Error posting new workout:", error);
      });
  }
  

  const renderAttributesInputs = () => {
    const selectedWorkoutAttributes = workoutAttributes[workoutDetails.type] || [];
    return selectedWorkoutAttributes.map((attribute) => (
      <div key={attribute}>
        <label>
          {attribute.charAt(0).toUpperCase() + attribute.slice(1)}:
          <input
            type="text"
            name={`attributes.${attribute}`}
            value={workoutDetails.attributes[attribute] || ''}
            onChange={(event) => handleChange({ target: { name: `attributes.${attribute}`, value: event.target.value } })}
          />
        </label>
        <br />
      </div>
    ));
  };

  return (
    <div>
      <h2>New Workout Form</h2>
      <p>Set IDs: {setIds}</p>
      <form>
        <label>
          Workout Type:
          <select
            name="type"
            value={workoutDetails.type}
            onChange={handleChange}
            required
          >
            <option value="">Select a Workout Type</option>
            <option value="Run">Run</option>
            <option value="Bike">Bike</option>
            <option value="Weight Training">Weight Training</option>
            <option value="HIIT">HIIT</option>
            <option value="Swim">Swim</option>
          </select>
        </label>
        <br />
        <label>
          Duration:
          <div>
            <input
              type="number"
              name="hours"
              value={workoutDetails.hours}
              onChange={handleChange}
              placeholder="Hours"
              min="0"
              max="23"
              required
            />
            :
            <input
              type="number"
              name="minutes"
              value={workoutDetails.minutes}
              onChange={handleChange}
              placeholder="Minutes"
              min="0"
              max="59"
              required
            />
            :
            <input
              type="number"
              name="seconds"
              value={workoutDetails.seconds}
              onChange={handleChange}
              placeholder="Seconds"
              min="0"
              max="59"
              required
            />
          </div>
        </label>
        <br />
        <label>
          Date:
          <DatePicker
            selected={workoutDetails.date}
            onChange={(date) => setWorkoutDetails((prevDetails) => ({ ...prevDetails, date }))}
          />
        </label>
        <br />
        <label for="time">
          Time:
          <input
            type="time"
            id="time"
            name="time"
            value={workoutDetails.time}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Attributes:
        </label>
        <br />
        {renderAttributesInputs()}
        <button type="button" role="button" className="contrast" onClick={postNewWorkout}>
          Post New Workout
        </button>
      </form>
    </div>
  );
}

export default NewWorkoutForm;
