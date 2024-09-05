import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WorkoutContext = createContext();

// Create an axios instance to handle authenticated requests
const userAxios = axios.create();

// Intercept requests to include the token
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
        console.log("Fetching workouts with token:", token);
        const res = await userAxios.get('/api/main/workout');
        setWorkouts(res.data);
        console.log("Fetched workouts:", res.data);
      } catch (error) {
        console.error("Error fetching workouts:", error.response ? error.response.data : error.message);
      }
    }
  };

  // Handle user signup
  const signup = async (creds) => {
    try {
      console.log("Attempting to sign up with credentials:", creds);
      const res = await  userAxios.post('/api/auth/signup', creds);
      const { user, token } = res.data;
      console.log("Signup response:", res.data);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setToken(token);
      resetAuthErr(); // Clear any previous error messages
    } catch (error) {
      console.error("Signup failed with error:", error);
      handleAuthErr(error.response?.data?.errMsg || "Signup failed");
    }
  };

// Handle user login
const login = async (creds) => {
  try {
      console.log("Attempting to log in with credentials:", creds);
      const res = await userAxios.post('/api/auth/login', creds);
      const { user, token } = res.data;
      console.log("Login response:", res.data);

      // Compare with existing values to avoid unnecessary updates
      const currentToken = localStorage.getItem("token");
      const currentUser = localStorage.getItem("user");

      if (token !== currentToken || JSON.stringify(user) !== currentUser) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setToken(token);
      }

      resetAuthErr();
      console.log("Login successful:", user);
  } catch (error) {
      console.error("Login failed with error:", error);
      handleAuthErr(error.response?.data?.errMsg || "Login failed");
  }
};


  // Handle user logout
  const logout = () => {
    console.log("Logging out user");
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
        console.log("Adding new workout:", newWorkout);
        const res = await userAxios.post('/api/main/workout', newWorkout);
        setWorkouts(prevWorkouts => [...prevWorkouts, res.data]);

        // Update user info
        // const updatedUser = await userAxios.get('/api/auth/current-user'); // Assuming you have an endpoint to get current user
        // setUser(updatedUser.data);
        console.log("Added workout:", res.data);
    } catch (error) {
        console.error("Error adding new workout:", error);
    }
};


  // Edit an existing workout
  const editWorkout = async (updates, workoutId) => {
    try {
      console.log(`Editing workout with ID ${workoutId}:`, updates);
      const res = await userAxios.put(`/api/main/workout/${workoutId}`, updates);
      setWorkouts(prevWorkouts => {
        const updatedWorkout = res.data;
        return prevWorkouts.map(workout =>
          workout._id === workoutId ? updatedWorkout : workout
        );
      });
      console.log("Edited workout:", res.data);
    } catch (error) {
      console.error("Error editing workout:", error);
    }
  };

  // Delete a workout
  const deleteWorkout = async (workoutId) => {
    try {
      console.log(`Deleting workout with ID ${workoutId}`);
      await userAxios.delete(`/api/main/workout/${workoutId}`);
      setWorkouts(prevWorkouts => prevWorkouts.filter(workout => workout._id !== workoutId));
      console.log("Deleted workout with ID:", workoutId);
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  useEffect(() => {
    console.log("Token changed, triggering useEffect:", token);
    if (token) {
      console.log("Fetching workouts");
      getWorkouts();
    }
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
