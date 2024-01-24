import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    date: new Date(),
    time: "",
    attributes: {},
 });

 const workoutAttributes = {
    Run: ['distance', 'pace', 'active calories', 'total calories', 'avg heart rate', 'max heart rate', 'elevation gain', 'notes'],
    Bike: ['distance', 'pace', 'active calories', 'total calories', 'avg heart rate', 'max heart rate', 'elevation gain', 'notes'],
    Swim: ['type', 'stroke', 'distance', 'laps', 'active calories', 'total calories', 'avg heart rate', 'max heart rate', 'notes'],
    "Weight Training": ['muscle group', 'type', 'weight', 'reps', 'sets', 'active calories', 'total calories', 'avg heart rate', 'max heart rate', 'notes'],
    HIIT: ['intensity', 'rounds', 'warm up', 'cool down', 'muscle group', 'active calories', 'total calories', 'notes'],
 };

 const fetchWorkoutDetails = async () => {
    try {
      const response = await fetch(`/api/users/${user?.id}/workouts/${workoutId}`);
      const data = await response.json();
      setExistingWorkout(data);

      prefillForm(data);
    } catch (error) {
      console.error('Error fetching workout details:', error);
    }
 };

const prefillForm = (data) => {
  // console.log(data);
  const durationParts = data.duration.split(':');
  const parsedAttributes = JSON.parse(data.attributes || '{}');
  setWorkoutDetails({
    type: data.type,
    hours: parseInt(durationParts[0], 10),
    minutes: parseInt(durationParts[1], 10),
    seconds: parseInt(durationParts[2], 10),
    date: new Date(data.date),
    time: data.time,
    attributes: parsedAttributes
  }); 
};

 useEffect(() => {
    fetchWorkoutDetails();
 }, [user?.id, workoutId]);

 const handleChange = (event) => {
    const { name, value } = event.target;
    let parsedValue = event.target.type === 'number' ? parseInt(value, 10) : value;

    if (name === 'time') {
      parsedValue = value; // Store the time input value as a string
    }

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
 };

 const handlePatchWorkout = async () => {
    try {
      const attributes = {};
      if (workoutDetails.type && workoutAttributes[workoutDetails.type]) {
        workoutAttributes[workoutDetails.type].forEach(attribute => {
          attributes[attribute] = workoutDetails.attributes[attribute] || '';
        });
      }

      if (workoutDetails.minutes < 0 || workoutDetails.minutes > 59 ||
        workoutDetails.seconds < 0 || workoutDetails.seconds > 59) {
        alert("Please enter valid minutes and seconds (0-59).");
        return;
      }
       // Add one day to the current date
    const updatedDate = new Date(workoutDetails.date);
    updatedDate.setDate(updatedDate.getDate() - 1);
    // Format the updated date
    const formattedUpdatedDate = updatedDate.toISOString().split('T')[0];



      const timeParts = workoutDetails.time.split(':');
      const timeHours = parseInt(timeParts[0], 10);
      const timeMinutes = parseInt(timeParts[1], 10);
      const time = new Date();
      time.setHours(timeHours);
      time.setMinutes(timeMinutes);

      const formattedTime = time.getHours().toString().padStart(2, '0') + ':' + time.getMinutes().toString().padStart(2, '0') + ':00';

      const formattedHours = workoutDetails.hours ? workoutDetails.hours.toString().padStart(2, '0') : '00';
      const formattedMinutes = workoutDetails.minutes ? workoutDetails.minutes.toString().padStart(2, '0') : '00';
      const formattedSeconds = workoutDetails.seconds ? workoutDetails.seconds.toString().padStart(2, '0') : '00';

      await fetch(`/api/users/${user?.id}/workouts/${workoutId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: workoutDetails.type,
          duration:`${formattedHours}:${formattedMinutes}:${formattedSeconds}`,
          date: formattedUpdatedDate,
          time: formattedTime,
          attributes: JSON.stringify(attributes),
        }),
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating workout details:', error);
    }
 };

 const renderInputsBasedOnType = () => {
  const type = existingWorkout?.type;

  if (type && workoutAttributes[type]) {
    return workoutAttributes[type].map((attribute) => (
      <div key={attribute}>
        <label htmlFor={attribute}>{attribute}:</label>
        <input
          type="text"
          id={attribute}
          value={workoutDetails.attributes[attribute] || ''}
          onChange={(e) => setWorkoutDetails((prevDetails) => ({
            ...prevDetails,
            attributes: { ...prevDetails.attributes, [attribute]: e.target.value },
          }))}
        />
      </div>
    ));
  }

  return null;
};


  return (
    <div>
      <label htmlFor="type">Type:</label>
      <input type="text" id="type" value={workoutDetails.type} readOnly />

      {/* Render common workout details input fields */}
      
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
    selected={new Date(workoutDetails.date)}
    onChange={(date) => setWorkoutDetails((prevDetails) => ({ ...prevDetails, date }))}
  />
</label>
<br />
<label htmlFor="time">
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


      {/* Render inputs based on workout type */}
      {renderInputsBasedOnType()}

      {/* Button to trigger the update */}
      <button onClick={handlePatchWorkout}>Update Workout</button>
    </div>
  );
}

export default EditWorkoutForm;
