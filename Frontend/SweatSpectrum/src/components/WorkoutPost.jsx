import React from 'react';

function formatTime(time) {
  const date = new Date(`1970-01-01T${time}`);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function WorkoutPost({ workout }) {
  const attributes = workout.attributes || {};

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
              <li key={attribute}>
                {attribute}: {value}
              </li>
            ))}
          </ul>
        </details>
        <p>Date: {workout.date}</p>
        <p>Duration: {workout.duration}</p>
        <p>id: {workout.id}</p>
        <p>Time: {formatTime(workout.time)}</p>
      </article>
    </>
  );
}

export default WorkoutPost;
