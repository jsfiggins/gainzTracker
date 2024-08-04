import React, { useContext } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';
import { Link } from 'react-router-dom';
import loggedImage from '../images/logged.png';
import newImage from '../images/new.png';

export default function HomePage() {
  const { user } = useContext(WorkoutContext);

  return (
    <div className="home-page">
      <h1 className="welcome-message">Welcome to the Workout Tracker, {user?.username}!</h1>
      <div className="image-container">
        <div className="image-item">
          <Link to="/log">
            <img src={loggedImage} alt="Logged Workouts" className="image" />
          </Link>
          <div className="caption">View Past Workouts</div>
        </div>
        <div className="image-item">
          <Link to="/add">
            <img src={newImage} alt="Add Workout Form" className="image" />
          </Link>
          <div className="caption">Add New Workout</div>
        </div>
      </div>
    </div>
  );
}
