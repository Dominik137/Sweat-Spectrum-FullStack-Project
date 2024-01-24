import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';

function WorkoutPost({ workout, user, handleDelete }) {
  const attributes = workout.attributes || {};

function formatTime(time) {
  const date = new Date(`1970-01-01T${time}`);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addOneDayAndFormat(dateString) {
  const originalDate = new Date(dateString);
  const newDate = new Date(originalDate);
  newDate.setDate(newDate.getDate());

  const formattedDate = `${newDate.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  })}`;

  return formattedDate;
}

const navigate = useNavigate();
  return (
    <>
      <article>
        <h2>{workout.type}</h2>
        <details>
          <summary role="button" className="secondary" style={{ width: '50%' }}>
            Stats
          </summary>
          <ul>
            {Object.entries(attributes).map(([attribute, value]) => (
              <li className="list-attributes" key={attribute}>
                <p className="attr-name">{attribute}:</p> 
                <p className="attr-val">{value}</p>
              </li>
            ))}
          </ul>
        </details>
        <p>Date: {addOneDayAndFormat(workout.date)}</p>
        <p>Duration: {workout.duration}</p>
        <p>id: {workout.id}</p>
        <p>Time: {formatTime(workout.time)}</p>
        <button role="button" className="contrast" onClick={()=>handleDelete(workout.id)} style={{ width: '20%', padding: '5px',  }} >Delete 🗑️</button>
        <button
          role="button"
          className="contrast"
          onClick={() => navigate(`/edit-workout/${workout.id}`)}
          style={{ width: '20%', padding: '5px' }}
        >
          Edit ✏️
</button>
      </article>
    </>
  );
}

export default WorkoutPost;
