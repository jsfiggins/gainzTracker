import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkoutContext } from '../context/WorkoutContext';
import Form from './Form';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, signup, errMsg, resetAuthErr } = useContext(WorkoutContext);
  const [isMember, setIsMember] = useState(true);

  const handleSubmit = async (formData) => {
    try {
      if (isMember) {
        await login(formData);
      } else {
        await signup(formData);
      }
      navigate('/home');
    } catch (error) {
      console.error("Error during login/signup:", error);
    }
  };

  const toggleForm = () => {
    setIsMember(!isMember);
    resetAuthErr();
  };

  return (
    <div id="auth-div" className="auth-div">
      <Form
        isMember={isMember}
        submit={handleSubmit}
        errMsg={errMsg}
      />
      <button className="toggle-form-button" onClick={toggleForm}>
        {isMember ? 'Create an Account?' : 'Already a Member?'}
      </button>
    </div>
  );
};

export default LoginPage;
