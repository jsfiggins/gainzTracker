import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WorkoutContext = createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [errMsg, setErrMsg] = useState("");

  // Fetch all workouts
  const getWorkouts = async () => {
    if (token) { // Only fetch if a token is present
      try {
        const res = await userAxios.get('/api/main/workout');
        setWorkouts(res.data);
      } catch (error) {
        console.error("Error fetching workouts:", error.response ? error.response.data : error.message);
      }
    }
  };

  // Handle user signup
  const signup = async (creds) => {
    try {
      const res = await axios.post('/api/auth/signup', creds);
      const { user, token } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setToken(token);
      resetAuthErr(); // Clear any previous error messages
    } catch (error) {
      handleAuthErr(error.response?.data?.errMsg || "Signup failed");
    }
  };

  const login = async (creds) => {
    try {
      const res = await axios.post('/api/auth/login', creds);
      const { user, token } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setToken(token);
      resetAuthErr();
      console.log("Login successful:", user);
    } catch (error) {
      handleAuthErr(error.response?.data?.errMsg || "Login failed");
    }
  };
  
  

  // Handle user logout
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser({});
    setToken("");
    setWorkouts([]); // Clear workouts on logout
  };

  // Handle authentication errors
  const handleAuthErr = (errMsg) => {
    setErrMsg(errMsg);
  };

  const resetAuthErr = () => {
    setErrMsg("");
  };

  // Add a new workout
  const addWorkout = async (newWorkout) => {
    try {
      const res = await userAxios.post('/api/main/workout', newWorkout);
      setWorkouts(prevWorkouts => [...prevWorkouts, res.data]);
    } catch (error) {
      console.error("Error adding new workout:", error);
    }
  };

  // Edit an existing workout
  const editWorkout = async (updates, workoutId) => {
    try {
      const res = await userAxios.put(`/api/main/workout/${workoutId}`, updates);
      setWorkouts(prevWorkouts => {
        const updatedWorkout = res.data;
        return prevWorkouts.map(workout =>
          workout._id === workoutId ? updatedWorkout : workout
        );
      });
    } catch (error) {
      console.error("Error editing workout:", error);
    }
  };

  // Delete a workout
  const deleteWorkout = async (workoutId) => {
    try {
      await userAxios.delete(`/api/main/workout/${workoutId}`);
      setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout._id !== workoutId));
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  useEffect(() => {
    getWorkouts();
  }, [token]); // Depend on token to refetch workouts when it changes

  return (
    <WorkoutContext.Provider
      value={{
        workouts,
        addWorkout,
        editWorkout,
        deleteWorkout,
        signup,
        login,
        logout,
        resetAuthErr,
        errMsg,
        user,
        token
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};
