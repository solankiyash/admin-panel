import React, { useState } from "react";
import "./LoginForm.css";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "", 
  });

  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      general: "",
    };

    if (!loginData.email) {
      newErrors.email = "Email is required";
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
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (storedUser) {
        if (storedUser.email === loginData.email && storedUser.password === loginData.password) {
          navigate('/admin');
        } else {
          setErrors({
            ...errors,
            general: "Invalid email or password",
          });
        }
      } else {
        setErrors({
          ...errors,
          general: "No user found. Please sign up.",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-screen bg-blue-500">
      <div className="max-w-md rounded-lg shadow-lg px-14 py-20 bg-white">
        <div className="text-[24px] font-semibold text-center mb-1">Login</div>
        <p className="text-gray-600 mb-5 text-sm">
          Please enter email and password to continue
        </p>

        {errors.general && (
          <div className="text-red-500 text-center mb-4">{errors.general}</div>
        )}

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

export default LoginForm;
