import React, { useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';
import WorkoutCard from '../components/WorkoutCard';

const WorkoutLogPage = () => {
  const { workouts, deleteWorkout } = useContext(WorkoutContext);

  return (
    <div className="workout-log-page">
      <h1 className="title">Workout Log</h1>
      <div className="workout-list">
        {workouts.map(workout => (
          <WorkoutCard
            key={workout._id}
            workout={workout}
            deleteWorkout={deleteWorkout}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutLogPage;
