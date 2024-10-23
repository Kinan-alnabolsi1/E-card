import React, { useEffect, useState } from 'react'
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
const Templpate1 = ({ color }) => {
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
    <div className=' h-screen bg-[#e5e7eb]'>
        <div className='relative w-full h-[50%]'>
      <section style={{
    position: 'relative',
    background: color,
    height: '25vh',
    width:"100%",
    borderBottomLeftRadius: '50% 15%',
    borderBottomRightRadius: '50% 15%',
}}></section>
          <div className='flex justify-center items-center'>
        <h2 className='absolute top-10 text-white text-3xl'>{personal?.profile?.firstName} {personal?.profile?.lastName}</h2>
        </div>
        </div>
        <div className='relative flex justify-center items-center'>
        <div className='absolute bottom-28'>
            <div className="w-32 h-32 rounded-full mx-auto  mt-10 bg-gradient-to-r p-[7px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
    <div class="flex flex-col justify-between h-full bg-white text-white rounded-full">
      <img src={personal?.profile?.photo} alt="" className='rounded-full w-auto h-28 '/>
</div>
     </div>
     </div>
        </div>
        
      <div>
        
        <div className='w-full h-[50%] -mt-24 text-[#a21caf]' style={{color:color}}>
        <h2 className='text-center text-2xl '>Find Me On </h2>
        <div className='w-full h-full flex justify-center items-center mt-5'>
         <div className='grid grid-cols-2 gap-2 gap-y-3 justify-center items-center w-[50%] '>
       {icons.map((item) => {
      return(
       <div className='flex justify-center items-center'>
        <div className=' border border-[#a21caf] p-1.5 rounded-md' style={{borderColor:color}}>
            <div className='text-3xl ' >{item.icon}</div>
        </div>
        </div>
      )
     })}
      </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Templpate1
