import React, { useState } from 'react';
import "./SingUpForm.css";
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SingUpForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      username: "",
      password: "",
    };

    if (!loginData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!loginData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onHandleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      localStorage.setItem('user', JSON.stringify(loginData));
      navigate('/login');
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-blue-500">
      <div className=" w-full max-w-[400px] rounded-lg shadow-lg px-14 py-20 bg-white">
        <div className="text-[24px] font-semibold text-center mb-1">Sign Up</div>
        <p className="text-gray-600 mb-5 text-sm">
          Create an account to continue
        </p>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <div className="text-sm text-gray-600 mb-1">Email address</div>
            <TextField
              id="email"
              type="email"
              size="small"
              variant="outlined"
              placeholder="Enter Email"
              name="email"
              onChange={onHandleChange}
              value={loginData.email}
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-gray-600 mb-1">Username</div>
            <TextField
              id="username"
              type="text"
              size="small"
              variant="outlined"
              placeholder="Enter Username"
              name="username"
              onChange={onHandleChange}
              value={loginData.username}
              error={!!errors.username}
              helperText={errors.username}
            />
          </div>
          <div className="flex flex-col">
            <div className="text-sm text-gray-600 mb-1">Password</div>
            <TextField
              id="password"
              type="password"
              size="small"
              name="password"
              variant="outlined"
              placeholder="Enter Password"
              onChange={onHandleChange}
              value={loginData.password}
              error={!!errors.password}
              helperText={errors.password}
            />
          </div>
        </div>

        <Button onClick={handleSubmit} variant="contained" className="w-full !mt-6">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default SingUpForm;
