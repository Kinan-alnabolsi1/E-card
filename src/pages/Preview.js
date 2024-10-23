import React, { useState } from 'react'
import logo from '../assets/goma.png'
import SwiperS from '../components/SwiperS'
import TemplatePreview from '../UI/TemplatePreview'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Preview = ({mainBoxColor , images}) => {
  const [TemplateColor,setTemplateColor]=useState('yellow')
  const [slide,setSlide]=useState('')
  const navigate=useNavigate()
  function changeColor(prop){
console.log(prop)
setTemplateColor(prop)
  }
   function slideId(pro){
    
    setSlide(pro)
   }
   const addtheme = 'http://127.0.0.1:8000/api/create_theme'
   const addthemee = async () => {
        try {
          const response = await axios.post(addtheme, {
            bgColor:TemplateColor,
            theme_id:slide
          }, {  
            headers: {
              "Authorization":`Bearer ${localStorage.getItem('token')}`,
              "Accept": "application/json",
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
   console.log(slide,"asdasss")
  return (
    <div className='p-2'>
      <div className='mb-5 md:pl-14 '>
        <img src={logo} />
      </div>
      <div className='flex md:flex-row flex-col md:justify-around justify-center md:items-stretch items-center'>
        <div className='flex flex-col gap-3 md:w-[50%] w-[100%] h-[50%]'>
         <h2 className='bg-gradient-to-r from-[#2C3A8E] to-[#2075B9] inline-block text-transparent bg-clip-text font-semibold text-lg'>Select Your Card Style</h2>
        <div className=''><SwiperS changeColor={changeColor} slideId={slideId} /></div>
        </div>
        <span className='border'></span>
        <div className='flex flex-col gap-3'> 
            <h2 className='bg-gradient-to-r from-[#2C3A8E] to-[#2075B9] inline-block text-transparent bg-clip-text font-semibold text-lg'>Preview</h2>
            {/* <img className='md:w-[85%] md:h-[85%]' src={mobile} /> */}
              <TemplatePreview TemplateColor={TemplateColor} Slide={slide} />
            <div className='flex flex-row gap-2 md:ml-1'>
                <button className='w-[100%] p-2 bg-[#2C3A8E] text-white' onClick={()=>{addthemee();navigate('/dashboard')}}>Select</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Preview

