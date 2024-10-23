import React, { useEffect, useState } from 'react'
import '../App.css'
import { FaFacebookF } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaSnapchatGhost } from "react-icons/fa";
import axios from 'axios';


const icons = [
    {icon:<FaFacebookF/> , },
    {icon:<FaLinkedinIn/> , },
    {icon:<RiInstagramFill/>},
    {icon:<FaTelegramPlane/> ,},
    {icon:<FaXTwitter/> , },
    {icon:<FaSnapchatGhost/> , },
    
  ]

const Template2 = ({ color }) => {
      const [personal,setPersonal] = useState([])

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
      
      console.log("data:",personal)

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(()=>{
    fetchpers();
  },[])
  return (
     <div className='h-screen bg-[#e5e7eb] overflow-y-auto'

    //  style={{background:color}}
    
    >
      <div className='h-[30%] flex flex-col justify-center items-center' style={{background:color}}>
     <div className='w-44 h-full flex justify-center items-center rounded-br-[100px] relative ss'>
    <div className=' absolute bottom-3 w-32 h-32 sss rounded-br-[100px] '>
        <img className='w-28 h-28 mt-2 ml-2 no-opacity rounded-br-[100px]' src={personal?.profile?.photo} />
        </div>
     </div>
     </div>

      <div className='h-[40%] relative z-50 bg-[#e5e7eb] w-full flex flex-col justify-center text-center p-3 text-cyan-500' style={{color:color}}>
        <div className='flex flex-col items-center'>
            <h2 className='text-3xl font-bold '>{personal?.profile?.firstName}</h2>
            <h2 className='text-2xl'>{personal?.profile?.lastName}</h2>
        </div>
        <h2 className='mt-2'>Social Media Accounts </h2>
        <div className='w-full h-full flex justify-center'>
         <div className='grid grid-cols-2 justify-center items-center w-[40%]'>
       {icons.map((item) => {
      return(
       <div className='flex justify-center items-center'>
        <div className=' border border-cyan-500 p-1.5 rounded-md' style={{borderColor: color }}>
            <div className='text-xl'>{item.icon}</div>
        </div>
        </div>
      )
     })}
      </div>
      </div>
    </div>
    </div>
  )
}

export default Template2
