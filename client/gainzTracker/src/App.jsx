
// import axios from 'axios';
// import WorkoutCard from './assets/components/WorkoutCard'; // Assuming you have a WorkoutCard component
import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from './assets/pages/HomePage';
import WorkoutLogPage from "./assets/pages/WorkoutLogPage";
import AddWorkoutPage from "./assets/pages/AddWorkoutPage";
import LoginPage from './assets/components/LoginPage';
import NavBar from './assets/components/NavBar';
import { WorkoutContext } from './assets/context/WorkoutContext';

const App = () => {
  const { user, logout, token } = useContext(WorkoutContext);
 // console.log("App User State:", user);

  return (
    <>
      {token && <NavBar logout={logout} /> }
      <div id="app">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/home" /> : <LoginPage />} />
          <Route path="/home" element={token ? <HomePage /> : <Navigate to="/" />} />
          <Route path="/log" element={token ? <WorkoutLogPage /> : <Navigate to="/" />} />
          <Route path="/add" element={token ? <AddWorkoutPage /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

