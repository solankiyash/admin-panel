import React, { useState } from 'react'
import "./SingUpForm.css"
import { Button, TextField } from '@mui/material';
function SingUpForm() { 
  const [loginData, setLoginData] = useState({
    email: "",
    username:"",
    password: "",
  });

  const onHandleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  return (  
    <div className="flex  justify-center items-center w-full h-screen bg-blue-500">
    <div className="w-full max-w-[400px] rounded-lg shadow-lg  px-14 py-20 bg-white">
      <div className="text-[24px] font-semibold text-center mb-1">Singup</div>
      <p className="text-gray-600 mb-5 text-sm">
        Create account to continue 
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
          />
        </div>
        <div className="flex flex-col">
          <div className="text-sm text-gray-600 mb-1">User name</div>
          <TextField
            id="username"
            type="username"
            size="small"
            variant="outlined"
            placeholder="Enter Username"
            name="username"
            onChange={onHandleChange}
            value={loginData.username}
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
          />
        </div>
      </div>

      <Button variant="contained" className="w-full !mt-6">
        Submit
      </Button>
    </div>
  </div>
      );
    };
    

export default SingUpForm
