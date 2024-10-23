import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import side from '../assets/image.png';
import contact from '../assets/contact.png';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { FaApple } from "react-icons/fa";
import { TiSocialFacebook } from "react-icons/ti";
import { FaGoogle } from "react-icons/fa";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Error from '../Model/LoginError'

const LoginL = () => {
  const [loader, setLoader] = useState(false);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [warning,setWarning] = useState(false)
  const [warning1,setWarning1] = useState(false) 
  const [warning2,setWarning2] = useState(false) 
  const navigate=useNavigate()


  const api = 'http://127.0.0.1:8000/api/login';
  async function LogIn() {
    setLoader(true);
    try {
      const response = await axios.post(api, {
        username: username,
        password: password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('id', response.data.user.id);
      console.log(response.status)
      console.log("User ID:",localStorage.getItem('id'))
      setLoader(false);
      navigate('/personal')
      // Optionally, redirect user or perform other actions upon successful login
    } catch(err){
    //  console.log(err.response.status)
    if (err.response && err.response.status == 401) {
  setWarning(true);
  setWarning1(false);
  setWarning2(false)
}else if (err.response && err.response.status === 422) {
      setWarning(false);
  setWarning1(true);
  setWarning2(false)
    }else  if(err.message == 'Network Error'){
      setWarning(false);
  setWarning1(false);
  setWarning2(true)
    }
     setLoader(false)
        }
    
  }

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <div className='flex justify-between w-screen h-screen '>
      <div className='w-[100%] xs:hidden sm:block'>
        <Box
          sx={{
            backgroundImage: `url(${side})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
            zIndex: 1000,
            transition: '0.5s filter linear',
          }}
        />
      </div>
      <div className='w-[100%]'>
        <div className='w-[63%] h-full max-h-[300px] flex flex-col justify-center mx-auto text-[#2C3A8E] '>
          <h1 className='text-[32px] md:whitespace-nowrap'>Sign in to start building</h1>
          <h1 className='text-[32px]'>MAGIC</h1>
        </div>
        <div className='flex flex-col items-center justify-center w-full mx-auto -mt-14'>
          <TextField
            label="Username"
            placeholder=""
            type='text'
            onChange={(e) => { setUserName(e.target.value) }}
            style={{
              width: "70%",
              h: 20,
            }}
          />
          <TextField
            label="Password"
            placeholder=""
            type='password'
            onChange={(e) => { setPassword(e.target.value) }}
            style={{
              marginTop: "5%",
              width: "70%",
              h: 20,
            }}
          />
          <Error visible={warning} data={'You are not authorized'}/>
          <Error visible={warning1} data={'Your Email or Password is wrong'}/>
          <Error visible={warning2} data={'An error occurred, try again'}/>
          <Button
            variant="contained"
            style={{
              top: 40,
              width: "70%",
              background: "#2C3A8E"
            }}
            onClick={LogIn} // Call LogIn function when the button is clicked
            disabled={loader} // Disable the button when loader is active
          >
            {!loader ? 'Login' : <CircularProgress style={{ color: 'white' }} size={30} />}
          </Button>
          {/* <img src={contact} alt="" className='mt-20 w-[70%] h-auto mx-auto ' /> */}
        </div>
        {/* <div className='flex justify-around items-center w-[70%] mt-14 mx-auto'>
          <div className='border-2 p-3 border-black'>
            <FaApple size={30} />
          </div>
          <div className='border-2 p-3 border-black'>
            <FaGoogle size={30} />
          </div>
          <div className='border-2 p-3 border-black'>
            <TiSocialFacebook size={30} />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default LoginL;
