import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './assets/pages/HomePage';
import WorkoutLogPage from './assets/pages/WorkoutLogPage';
import AddWorkoutPage from './assets/pages/AddWorkoutPage';
import LoginPage from './assets/components/LoginPage';
import NavBar from './assets/components/NavBar';
import { WorkoutContext } from './assets/context/WorkoutContext';
import Layout from './assets/components/Layout'; // Import the Layout component

const App = () => {
  const { user, logout, token } = useContext(WorkoutContext);

  return (
    <>
      {token && <NavBar logout={logout} />}
      <div id="app">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/home" /> : <LoginPage />} />
          <Route element={<Layout />}> {/* Wrap routes with Layout */}
            <Route path="/home" element={token ? <HomePage /> : <Navigate to="/" />} />
            <Route path="/log" element={token ? <WorkoutLogPage /> : <Navigate to="/" />} />
            <Route path="/add" element={token ? <AddWorkoutPage /> : <Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </>
  );
};

export default App;
