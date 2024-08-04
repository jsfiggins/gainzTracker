import React from 'react';

const WorkoutCard = ({ workout, deleteWorkout }) => {
  const { _id, date, exercises } = workout;

  return (
    <div className="workout-card">
      <h2>{new Date(date).toLocaleDateString()}</h2>
      <ul>
        {exercises.map((exercise, index) => (
          <li key={index}>
            <h3>{exercise.name}</h3>
            <p>Rest Time: {exercise.restTime}</p>
            <p>Notes: {exercise.notes}</p>
            <ul>
              {exercise.sets.map((set, setIndex) => (
                <li key={setIndex}>
                  Set {set.setCount}: {set.reps} reps at {set.weight} lbs
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <button onClick={() => deleteWorkout(_id)}>Delete</button>
    </div>
  );
};

export default WorkoutCard;
