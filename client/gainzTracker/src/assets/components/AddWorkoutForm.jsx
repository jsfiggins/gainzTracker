import React, { useState, useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';

export default function AddWorkoutForm() {
  const initialExercise = { name: '', sets: [{ setCount: 1, reps: '', weight: '' }], restTime: '', notes: '' };
  const initialWorkout = { date: '', exercises: [initialExercise] };
  const [workout, setWorkout] = useState(initialWorkout);
  const { addWorkout } = useContext(WorkoutContext);

  function handleExerciseChange(e, exerciseIndex, setIndex) {
    const { name, value } = e.target;
    const [field, subField] = name.split('.');

    setWorkout(prevWorkout => {
      const newExercises = [...prevWorkout.exercises];
      const updatedExercise = { ...newExercises[exerciseIndex] };
      
      if (subField) {
        const newSets = [...updatedExercise.sets];
        newSets[setIndex] = {
          ...newSets[setIndex],
          [subField]: value
        };
        updatedExercise.sets = newSets;
      } else {
        updatedExercise[field] = value;
      }

      newExercises[exerciseIndex] = updatedExercise;
      return { ...prevWorkout, exercises: newExercises };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addWorkout({ ...workout, date: new Date().toISOString() });
    setWorkout(initialWorkout); // Reset form after submission
  }

  function addExercise() {
    setWorkout(prevWorkout => ({
      ...prevWorkout,
      exercises: [...prevWorkout.exercises, initialExercise]
    }));
  }

  function addSet(exerciseIndex) {
    setWorkout(prevWorkout => {
      const newExercises = [...prevWorkout.exercises];
      const newSets = [
        ...newExercises[exerciseIndex].sets,
        { setCount: newExercises[exerciseIndex].sets.length + 1, reps: '', weight: '' }
      ];
      newExercises[exerciseIndex] = { ...newExercises[exerciseIndex], sets: newSets };
      return { ...prevWorkout, exercises: newExercises };
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {workout.exercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className="exercise-group">
          <input
            type="text"
            name="name"
            value={exercise.name}
            onChange={(e) => handleExerciseChange(e, exerciseIndex)}
            placeholder="Exercise Name"
            className="input-field"
          />
          {exercise.sets.map((set, setIndex) => (
            <div key={setIndex} className="set-group">
              <input
                type="number"
                name="sets.setCount"
                value={set.setCount}
                onChange={(e) => handleExerciseChange(e, exerciseIndex, setIndex)}
                placeholder="Set Number"
                className="input-field"
              />
              <input
                type="number"
                name="sets.reps"
                value={set.reps}
                onChange={(e) => handleExerciseChange(e, exerciseIndex, setIndex)}
                placeholder="Reps"
                className="input-field"
              />
              <input
                type="number"
                name="sets.weight"
                value={set.weight}
                onChange={(e) => handleExerciseChange(e, exerciseIndex, setIndex)}
                placeholder="Weight"
                className="input-field"
              />
            </div>
          ))}
          <button type="button" onClick={() => addSet(exerciseIndex)} className="add-set-button">Add Set</button>
          <input
            type="text"
            name="restTime"
            value={exercise.restTime}
            onChange={(e) => handleExerciseChange(e, exerciseIndex)}
            placeholder="Rest Time"
            className="input-field"
          />
          <input
            type="text"
            name="notes"
            value={exercise.notes}
            onChange={(e) => handleExerciseChange(e, exerciseIndex)}
            placeholder="Notes"
            className="input-field"
          />
        </div>
      ))}
      <button type="button" onClick={addExercise} className="add-exercise-button">Add Exercise</button>
      <button type="submit" className="submit-button">Add Workout</button>
    </form>
  );
}
