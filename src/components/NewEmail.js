import React , {useState , useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/system';
import side from '../assets/image.png'
import axios from 'axios';
const ChangeEmail = () => {

    const navigate = useNavigate();
    // const [newEmail,setNewEmail]= useState('');
    const [loader,setLoader] = useState(false);
    const [newemail,setNewemail] = useState('')
     const handleChange = () => {
    setLoader(true);
  }
  const handleResetEmail = () => {
    // if (areEmailsEqual && areValidEmails) {
      setTimeout(() => {
      navigate('/dashboard');
    }, 3000);}
const addEmail = 'http://127.0.0.1:8000/api/change_email'
const Changeemail = async () => {
        try {
          const response = await axios.put(addEmail, {
            email:newemail
          }, {  
            headers: {
              "Authorization":`Bearer ${localStorage.getItem('token')}`,
              "Accept": "application/json"
              },
          }
          );
          console.log('response',response)
          // handleSubmits()
        } catch (error) {
          console.error('Error sending date through DataAPI:', error);
          // Handle error, show an error message to the user
      }
    };

  return (
    <div className='flex justify-between w-screen h-screen '>
      <div className='w-[50%] xs:hidden sm:block'>
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
        <div className='md:w-[50%] w-[100%] flex flex-col gap-5 justify-center items-center'>
          <div className='flex justify-start items-start w-[60%]'>
        <h1
        className='text-[30px] md:whitespace-nowrap text-[#2C3A8E] mr-24 mb-5'
        >Edit Email</h1>
        </div>
        <TextField
          label="Your New Email"
          placeholder=""
          onChange={(e)=>{setNewemail(e.target.value)}}
          style={{
          //   left: 45,
            width: '60%',
          //   h: 20,
          }}
        />
        {/* <TextField
          label="New Email"
          placeholder=""
          onChange={(e)=>{setNewEmail(e.target.value);}}
          style={{
          //   left: 45,
          //   top: 15,
            width: '60%',
          //   h: 20,
          }}
        /> */}
         <Button 
              variant="contained" 
              style={{width:"60%",top:30,left: 0}}  
              onClick={() => {
                        handleResetEmail();
                        // handleChange();
                        Changeemail();
                    }}
              // disabled={!areEmailsEqual || !areValidEmails}
              >
                    {!loader ? 'continue' : <CircularProgress style={{ color: 'white' }} size={30} />}
                </Button>
        </div>
      
    </div>
  )
}

export default ChangeEmail
