import React, { useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';
import WorkoutCard from '../components/WorkoutCard';

const WorkoutLogPage = () => {
  const { workouts, deleteWorkout } = useContext(WorkoutContext);

  return (
    <div className="workout-log-page">
      <h1 className="title">Workout Log</h1>
      {workouts.length === 0 ? (
           <div className="placeholder-container workout-log-page">
           <p className="placeholder-message">You haven't tracked any workouts yet. Start adding some workouts!</p>
           <button className="cta-button" onClick={() => navigate('/add-workout')}>Add Your First Workout</button>
         </div>
      ) : (
        <div className="workout-list">
          {workouts.map(workout => (
            <WorkoutCard
              key={workout._id}
              workout={workout}
              deleteWorkout={deleteWorkout}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutLogPage;
