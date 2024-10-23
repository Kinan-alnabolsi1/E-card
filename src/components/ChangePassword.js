import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Box } from '@mui/system';
import side from '../assets/image.png'
import axios from 'axios';
import { CircularProgress } from '@mui/material';


const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const arePasswordsEqual = newPassword === confirmPassword;
  const areInputsNotEmpty = email !== '' && newPassword !== '' && confirmPassword !== '';

  // Function to validate email format
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = () => {
    setLoader(true);
  };

  const handleResetPassword = () => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const api = 'http://127.0.0.1:8000/api/change_password';

  const change_password = async () => {
    try {
      const response = await axios.post(api, {
        email: email,
        password: newPassword
      }, {
        headers: {
          "Accept": "application/json",
        },
      });
      console.log('Response:', response);
    } catch (error) {
      console.error('Error sending data through DataAPI:', error);
      // Handle error, show an error message to the user
    }
  };

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
      <div className='w-[100%] flex flex-col gap-5 justify-center items-center'>
        <div className='flex justify-start items-start w-[60%]'>
          <h1 className='text-[30px] md:whitespace-nowrap text-[#2C3A8E] mr-24 mb-5'>Edit password</h1>
        </div>
        <TextField
          label="Your Email"
          placeholder=""
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '60%' }}
          error={!isEmailValid(email) && email !== ''}
          helperText={!isEmailValid(email) && email !== '' ? "Please enter a valid email address" : ""}
        />
        <TextField
          label="New Password"
          placeholder=""
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ width: '60%' }}
        />
        <TextField
          label="Confirm New Password"
          placeholder=""
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: '60%' }}
        />
        <Button
          variant="contained"
          style={{ width: '60%', background: "#2C3A8E", color: "white", marginTop: "20px" }}
          onClick={() => {
            change_password();
            handleChange();
            handleResetPassword();
          }}
          disabled={!arePasswordsEqual || !areInputsNotEmpty}
        >
          {!loader ? 'save' : <CircularProgress style={{ color: 'white' }} size={30} />}
        </Button>
      </div>

    </div>
  );
};

export default ChangePassword;
