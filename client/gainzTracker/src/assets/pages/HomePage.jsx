import React, { useContext, useMemo } from 'react';
import { WorkoutContext } from '../context/WorkoutContext';
import { Link } from 'react-router-dom';
import loggedImage from '../images/logged.png';
import newImage from '../images/new.png';

export default function HomePage() {
  const { user, workouts } = useContext(WorkoutContext);

  // Calculate total workouts
  const totalWorkouts = useMemo(() => workouts.length, [workouts]);

  // Calculate active days
  const activeDays = useMemo(() => {
    const uniqueDates = new Set(
      workouts.map(workout => new Date(workout.date).toDateString())
    );
    return uniqueDates.size;
  }, [workouts]);

  return (
    <div className="home-page">
      <h1 className="welcome-message">Welcome to the GainzTracker, {user?.username}!</h1>
      <div className="hero-section">
        <h2>Your Personal Fitness Assistant</h2>
        <p>Track your workouts, monitor your progress, and achieve your fitness goals with ease.</p>
        <small className="update">Our app is continuously evolving! We have a roadmap full of exciting features and improvements planned. Check back often to see what’s new and how we’re enhancing your fitness journey.</small>
      </div>
      <div className="stats-section">
        <div className="stat-item">
          <h3>Total Workouts</h3>
          <p>{totalWorkouts || 0}</p>
        </div>
        <div className="stat-item">
          <h3>Active Days</h3>
          <p>{activeDays || 0}</p>
        </div>
      </div>
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
