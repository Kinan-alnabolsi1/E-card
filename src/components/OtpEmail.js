import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { BorderClear } from "@mui/icons-material";
import side from '../assets/image.png'
import axios from "axios";


export default function OtpPassword() {
    const [timerCount, setTimer] = useState(60);
    const [OTPinput, setOTPinput] = useState(["" ,"" ,"" ,"" ,""]);
    const [concatenatedOTP, setConcatenatedOTP] = useState('');
    const [disable, setDisable] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [personal,setPersonal] = useState([])
  // console.log('links:', links);

  const handleResetEmail = () => {
    // if (areEmailsEqual && areValidEmails) {
      setTimeout(() => {
      navigate('/');
    }, 3000);}


const pers = `http://127.0.0.1:8000/api/user/${localStorage.getItem('id')}`;
  // const { t } = useTranslation();
  const fetchpers = async () => {
    try {
      const response = await axios.get(pers, {
        headers: {
          // Include any required headers here
          // Example:
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ContentType:'application/json'
        },
      });
      setPersonal(response.data)
      // setData(links_views.links_views);
      
      console.log("pers:",personal)

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(()=>{
    fetchpers();
  },[])
  const checkcode = 'http://127.0.0.1:8000/api/check_code'
const Checker = async () => {
        try {
          const response = await axios.post(checkcode, {
            code:concatenatedOTP,
            email:personal.email
          }, {  
            headers: {
              "Accept": "application/json",
              // "Access-Control-Allow-Origin": "*"
              },
          }
          );
          console.log('ff',response)
          // handleSubmits()
        } catch (error) {
          console.error('Error sending date through DataAPI:', error);
          // Handle error, show an error message to the user
      }
    };

  //   function verifyOTP() {
  //   setIsLoading(true);
  //   const otpCode = OTPinput.join("");
  //   const token = localStorage.getItem('token');
  //   // if (!token) {
  //   //   setError("Authentication token is missing.");
  //   //   return;
  //   // }
  // }
console.log(OTPinput,"otp")
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
        <div className="w-[100%] flex flex-col justify-center items-center">
          <div className='flex justify-start items-start w-[50%]'>
        <h1
        className='text-[30px] whitespace-nowrap text-[#2C3A8E] mr-24 mb-5'
        >Edit Email</h1>
        </div>
        <h2 className="text-xl w-[50%] ">We’ve send you the verification code on <span className="font-bold">{personal?.email}</span></h2>
        <Typography variant="body1" align="center" sx={{ color: "#fff" }}>
        We have sent a code to your email {localStorage.getItem('emailToChange')}
        </Typography>

        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "24px", mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", maxWidth: "350px", margin: "0 auto" }}>
  {OTPinput.map((value, index) => (
    <div className="mx-1" key={index}>
         <TextField
          key={index}
          type="text"
          variant="outlined"
          inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
          value={value}
         onChange={(e) => {
  const updatedOTPinput = [...OTPinput];
  const inputValue = e.target.value;
  
  if (inputValue === "") { // Handle backspace key
    updatedOTPinput[index] = ""; // Set the value to an empty string
  } else {
    const numericValue = parseInt(inputValue); // Convert string to number
    if (!isNaN(numericValue)) { // Check if it's a valid number
      updatedOTPinput[index] = numericValue; // Store the numeric value
    } else {
      // Handle non-numeric input (optional)
    }
  }

  setOTPinput(updatedOTPinput);
  const concatenatedString = updatedOTPinput.join(''); // Concatenate all numbers
  setConcatenatedOTP(concatenatedString); // Update the state with the concatenated OTP
}}
          onKeyPress={(e) => {
            const keyCode = e.keyCode || e.which;
            const keyValue = String.fromCharCode(keyCode);
            const numberRegex = /^[0-9]+$/;
            if (!numberRegex.test(keyValue)) {
              e.preventDefault();
            }
          }}
        />
    </div>
  ))}
</Box>

<div className="mb-10">
  {/* <h2 className="text-center text-sm font-semibold">Re-send code in <span className="text-[#2075B9]">0:20</span></h2> */}
</div>
          {error && <Typography color="error">{error}</Typography>}

            <Button
  variant="contained"
  sx={{
    padding: "1px", // Adjust the padding to decrease the height
  }}
  onClick={()=>{Checker();
  handleResetEmail();
  }}
>
  {isLoading ? (
    <CircularProgress 
      size={24} 
      style={{
        color: 'black',
        position: 'absolute',
        top: '50%',
        left: '50%',
      }}
    />
  ) : (
    <h4 style={{ color: "black"  , padding:"5px" , color:"white" }}>Save</h4>
  )}
</Button>


            {/* <Typography align="center" sx={{ fontSize: "12px", color: "#737373" , fontFamily:"Robote_bold" }}>
            <Button onClick={() => navigate(-1)} sx={{ marginTop: "1px" , fontFamily:"Robote_bold" , fontWeight:"bold" }}>
            Back
        </Button>
       <Button disabled={disable} onClick={resendOTP} sx={{ color: disable ? "#fff" : "#fff", textDecoration: disable ? "none" : "underline" }}>
              {disable ? `Resend_OTP in ${timerCount}s` : 'Resend_OTP' }
            </Button>
        
          </Typography> */}
        </Box>
      </div>
    </div>
  );
}