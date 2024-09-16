import React, { useState } from "react";
import "./LoginForm.css";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
// import { setUser } from "../../../Features/userSlice";


function LoginForm() {
  const dispatch = useDispatch()
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const onHandleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/login",{
      method:"POST",
      body:JSON.stringify(loginData)
    })
    const data = await response.json();

    if(response.ok){
      // dispatch(setUser(data.user))
    }else{
      console.log("Login failed",data.message)
    }
  }
  

  return (
    <div className="flex justify-center items-center w-full h-screen bg-blue-500">
      <div className="max-w-md rounded-lg shadow-lg px-14 py-20 bg-white">
        <div className="text-[24px] font-semibold text-center mb-1">Login</div>
        <p className="text-gray-600 mb-5 text-sm">
          Please enter email and password for continue
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

        <Button onClick={handleSubmit} variant="contained" className="w-full !mt-6">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default LoginForm;
