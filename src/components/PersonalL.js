import React, { useState , useEffect, useRef } from 'react'
import side from '../assets/image.png'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import { BiUpload } from "react-icons/bi";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PersonalL = () => {
    const navigate=useNavigate()
    const [loader,setLoader] = useState(false)
    const [page,SetPage]= useState(0)
 
    const [image,setImage]=useState('')
    const [photo, setPhoto] = useState('');
    const [cover, setCover] = useState('');
    const [profile, setProfile] = useState('No selected file');
    const [profile2, setProfile2] = useState('No selected file');
    const [image2, setImage2] = useState('');
    const [links,setLinks] = useState([])
    const [personal,setPersonal] = useState([])
    const [pageStates, setPageStates]=useState(
    { firstName: personal?.profile?.firstName, lastName: personal?.profile?.lastName, email: personal?.profile?.email }, // Page 0 state
    { phonenumber: personal?.profile?.phoneNum, location: personal?.profile?.location, bio: personal?.profile?.about },  // Page 1 state
  );
    const [data, setData] = useState({
    selectedImages: [],
    inputFields: '',
    });
       
  
    const handleTextFieldChange = (field, value) => {
    setPageStates((prevStates) => {
      const newState = Object.assign({}, prevStates);
      newState[page] = { ...newState[page], [field]: value };
      return newState;
    });
  };
  
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
      setPageStates(  { firstName: personal?.profile?.firstName, lastName: personal?.profile?.lastName, email: personal?.email }, // Page 0 state
    { phonenumber: personal?.profile?.phoneNum, location: personal?.profile?.location, bio: personal?.profile?.about },  )
      console.log("data:",personal)
      console.log(pageStates,"lastname")

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(()=>{
    fetchpers();
  },[])
  // console.log("lastname",pageStates)
  console.log(personal?.profile?.phoneNum)
const link = `http://127.0.0.1:8000/api/link`;
  // const { t } = useTranslation();
  const fetchlinks = async () => {
    try {
      const response = await axios.get(link, {
        headers: {
          // Include any required headers here
          // Example:
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ContentType:'application/json'
        },
      });
      setLinks(response.data)
      // setData(links_views.links_views);
      
      // console.log("visit:",visit)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(()=>{
    fetchlinks();
  },[])
  // console.log(data.selectedImages[0].id,"asdasd")
  // console.log(data.inputFields,"hgfd")
  
const createLink = 'http://127.0.0.1:8000/api/create_links'
  const addlink = async () => {
  try {
    const selectedImagesData = data.selectedImages.map(selectedImage => ({
      id: selectedImage.id,
      value: String(data.inputFields[selectedImage.id] || ''), // Get the input field value for the selected image
    }));

    const response = await axios.post(createLink, {
      primaryLinks: selectedImagesData,
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Accept": "application/json",
      },
    });

    console.log('Response:', response);
  } catch (error) {
    console.error('Error sending data through DataAPI:', error);
    // Handle error, show an error message to the user
  }
};
  

  const handleImageClick = (id) => {
    const selected = links.find((item) => item.id === id);
    setData((prevData) => ({
      ...prevData,
      selectedImages: [...prevData.selectedImages, selected],
    }));
    setLinks((prevArray) => prevArray.filter((item) => item.id !== id));
  };

  const handleRemoveImage = (id) => {
    const removedImage = data.selectedImages.find((item) => item.id === id);
    setData((prevData) => {
      const updatedInputFields = { ...prevData.inputFields };
      delete updatedInputFields[id];
      return {
        selectedImages: prevData.selectedImages.filter((item) => item.id !== id),
        inputFields: updatedInputFields,
      };
    });
    setLinks((prevArray) => [...prevArray, removedImage]);
  };

  const handleInputChange = (e, selectedImage) => {
    const updatedIndex = e.target.value;
    setData((prevData) => ({
      ...prevData,
      inputFields: {
        ...prevData.inputFields,
        [selectedImage.id]: updatedIndex,
      },
    }));
  };
    const handleLogin = () => {
    setLoader(true);
  }
  const Upload = ()=>{
    navigate('/preview')
  }
const addURL = 'http://127.0.0.1:8000/api/create_personal_data'
const addData = async () => {
        try {
          const response = await axios.post(addURL, {
            firstName:pageStates[0].firstName,
            lastName:pageStates[0].lastName,
            location:pageStates[1].location,
            phoneNum:pageStates[1].phonenumber,
            about:pageStates[1].bio,
            email:pageStates[0].email
          }, {  
            headers: {
              "Authorization":`Bearer ${localStorage.getItem('token')}`,
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*"
              },
          }
          );
          console.log('add',response)
          // handleSubmits()
        } catch (error) {
          console.error('Error sending date through DataAPI:', error);
          // Handle error, show an error message to the user
      }
    };

    const upapi = 'http://127.0.0.1:8000/api/update_profile'
const updateData = async () => {
        try {
          const formData = new FormData();
            formData.append('photo', photo);
            formData.append('cover', cover); 

          const selectedImagesData = data.selectedImages.map(selectedImage => ({
      id: selectedImage.id,
      value: String(data.inputFields[selectedImage.id] || ''), // Get the input field value for the selected image
    }));
          const response = await axios.post(upapi, {
            firstName:pageStates[0].firstName ,
            lastName:pageStates[0].lastName,
            location:pageStates[1].location,
            phoneNum:pageStates[1].phonenumber,
            about:pageStates[1].bio,
            email:pageStates[0].email,
            primaryLinks: selectedImagesData,
            formData
          }, {
            headers: {
              "Authorization":`Bearer ${localStorage.getItem('token')}`,
              "Accept": "application/json",
              "Access-Control-Allow-Origin": "*"
              },
          }
          );
          console.log('update',response)
          // handleSubmits()
        } catch (error) {
          console.error('Error sending date through DataAPI:', error);
          // Handle error, show an error message to the user
      }
    };
//     const ImageURL = 'http://192.168.1.126:8000/api/create_other_data'
// const addImage = async () => {
//         try {
//           const response = await axios.post(ImageURL, {
//             cover:image,
//             photo:image2
//           }, {  
//             headers: {
//               "Authorization":`Bearer ${localStorage.getItem('token')}`,
//               "Accept": "application/json",
//               },
//           }
//           );
//           console.log('addImage',response)
//           // handleSubmits()
//         } catch (error) {
//           console.error('Error sending date through ImageAPI:', error);
//           // Handle error, show an error message to the user
//       }
//     };
  //    function handleImage(e) {
  //   const file = e.target.files[0];
  //   setImage(URL.createObjectURL(file));
  //   setImagee(e.target.files[0])
  //   setProfile(file.name); // Update profile to show the selected file name
  // }

  function handleImage(e, inputName) {
  const file = e.target.files[0];
  const image = URL.createObjectURL(file);
  if (inputName === 'image') {
    setImage(image);
    setPhoto(file);
    setProfile(file.name);
  } else if (inputName === 'image2') {
    setImage2(image);
    setCover(file);
    setProfile2(file.name);
  }
}

    function addimages() {
      console.log('photo', photo)
      console.log('cover', cover)
  const formData = new FormData();
  formData.append('photo', photo);
  formData.append('cover', cover);    
  axios.post('http://127.0.0.1:8000/api/create_other_data', formData, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  })
  .then((res) => {
    console.log('res',res);
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });
}


 

  return (
    <div className='flex justify-between w-screen h-screen '>
         <div className='w-[100%] xs:hidden sm:block'>
            <Box
      sx={{
        backgroundImage: `url(${side})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // width: "100vh",
        height: "100%",
        zIndex: 1000,
        transition: '0.5s filter linear',
      }}
      />
        </div>

        <div className='w-[100%]'>
          {(() => {
  switch (page) {
    case 0:
      return (
        <>
          <div className='w-[63%] h-full max-h-[200px] flex flex-col justify-center mx-auto text-[#2C3A8E]'>
            <h1 className='text-[32px] w-[110%]'>Enter Your Information</h1>
          </div>
          <div className='flex flex-col items-center justify-center w-full mx-auto '>
            <TextField
              label="first name"
              onChange={(e) => handleTextFieldChange('firstName', e.target.value)}
              value={pageStates[page]?.firstName || personal?.profile?.firstName || ''}
              style={{
                width: "70%",
                height: 20,
              }}
            />
            <TextField
              label="last name"
              onChange={(e) => handleTextFieldChange('lastName', e.target.value)}
              placeholder=""
              value={pageStates[page]?.lastName || personal?.profile?.lastName || ''}
              style={{
                top:75,
                width: "70%",
                height: 20,
              }}
            />
            <TextField
              onChange={(e) => handleTextFieldChange('email', e.target.value)}
              label="email"
              placeholder=""
              value={pageStates[page]?.email || personal?.email || ''}
              style={{
                top:150,
                width: "70%",
                height: 20,
              }}
            />
            <Button
                    variant="contained"
                    style={{
                      top:320,
                      width:"70%",
                      background:"#2C3A8E"
                      }}
                     onClick={() => {SetPage(page + 1);}}
                    >
                    NEXT
                    </Button>
          </div>
          
        </>
      );
      case 1:
      return (
        <>
          <div className='w-[63%] h-full max-h-[200px] flex flex-col justify-center mx-auto text-[#2C3A8E] '>
            <h1 className='text-[32px] w-[110%]'>Enter Your Information</h1>
          </div>
          <div className='flex flex-col items-center justify-center w-full mx-auto '>
            <TextField
              label="phone number"
              value={pageStates[page]?.phonenumber || personal?.profile?.phoneNum || ''}
              onChange={(e) => handleTextFieldChange('phonenumber', e.target.value)}
              style={{
                width: "70%",
                height: 20,
              }}
            />
            <TextField
              label="location"
              value={pageStates[page]?.location || personal?.profile?.location || ''}
              onChange={(e) => handleTextFieldChange('location', e.target.value)}
              style={{
                top:75,
                width: "70%",
                height: 20,
              }}
            />
            <TextField
              onChange={(e) => handleTextFieldChange('bio', e.target.value)}
              label="About"
              type='text'
              multiline   
              rows={4}
              value={pageStates[page]?.bio || personal?.profile?.about || ''}
              style={{
                top:150,
                width: "70%",
                height: 20,
              }}
            />
            <div className='w-[60%] flex justify-between mt-80'>
            <Button
                    
                    style={{
                      width:"50%",
                      color:"#B8C0C7",
                      }}
                      onClick={() => {SetPage(page - 1);}}
                    >
                    BACK
                    </Button>
                    <Button
                    variant="contained"
                    style={{
                      width:"50%",
                      background:"#2C3A8E",
                      color:"#ffff",
                      }}
                      onClick={() => {SetPage(page + 1);}}
                    >
                    NEXT
                    </Button>
                    </div>
          </div>
        </>
      );
     
      case 2:
      return (
        <>
          <div className='w-[63%] h-full max-h-[200px] flex flex-col justify-center mx-auto text-[#2C3A8E] '>
            <h1 className='text-[32px] w-[120%]'>Enter Your Information</h1>
          </div>

          <div>
            <div className='flex flex-col justify-center items-center mx-auto'>
                 <div className=" flex flex-col justify-center items-center">
      <div>
        <div className="grid grid-cols-2 gap-9">
        {links.map((item) => (
          <div key={item.id}>
            <img
              className="w-14 h-auto cursor-pointer border border-[#2C3A8E] rounded-lg shadow-md p-1"
              src={item.logo}
              alt={`logo ${item.id}`}
              onClick={() => handleImageClick(item.id)}
            />
          </div>
          
        ))}
        
      </div>
        {data.selectedImages.map((selectedImage) => (
          <div key={selectedImage.id} className="flex items-center mt-5">
            <img
              className="w-12 h-12 mr-4"
              src={selectedImage.logo}
              alt={`Selected Image ${selectedImage.id}`}
            />
            <input
              type="text"
              value={data.inputFields[selectedImage.id] || ''}
              onChange={(e) => handleInputChange(e, selectedImage)}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5'
            />
            <button onClick={() => handleRemoveImage(selectedImage.id)} className='text-3xl w-10 ml-2'>X</button>
          </div>
        ))}
      </div>
      {/* <div className='hidden'><PersonalL addlink={addlink} /></div> */}
    </div>
                 <div className='w-[60%] flex justify-between mt-40'>
            <Button
                    
                    style={{
                      width:"50%",
                      color:"#B8C0C7",
                      }}
                      onClick={() => {SetPage(page - 1);}}
                    >
                    BACK
                    </Button>
                    <Button
                    variant="contained"
                    style={{
                      width:"50%",
                      background:"#2C3A8E",
                      color:"#ffff",
                      }}
                      onClick={() => {SetPage(page + 1);}}
                    >
                    NEXT
                    </Button>
                    </div>
          </div>
          
          </div>
          
        </>
      );
       case 3:
      return (
        <>
          <div className='w-[63%] h-full max-h-[200px] flex flex-col justify-center mx-auto text-[#2C3A8E] '>
            <h1 className='text-[32px] w-[120%]'>Enter Your Information</h1>
          </div>

          <div className='flex flex-col items-center justify-center w-full mx-auto -mt-10'>
            <h1 className='text-[20px] w-[56%] md:-ml-20 lg:-ml-0'>Profile Photo:</h1>
            <form
  action=""
  className="flex flex-col justify-center items-center border-2 border-dashed border-black xs:h-[100px] xs:w-[200px] md:h-[150px] md:w-[400px] cursor-pointer rounded-md mb-10"
>
  <input
    type="file"
    name="file"
    onChange={(e) => handleImage(e, 'image')}
    className="hidden"
    id="file-input"
  />
  <label htmlFor="file-input">
    {image ? (
  <img
    src={image}
    height={20}
    className="xs:w-[50px] sm:w-[70px] md:w-[110px]"
    alt={profile}
  />
) : personal?.profile?.photo ? (
  <img
    src={personal?.profile?.photo}
    height={20}
    className="xs:w-[50px] sm:w-[70px] md:w-[110px]"
    alt={profile}
  />
) : (
  <BiUpload color="#1475cf" size={60} />
)}
  </label>
</form>
            <h1 className='text-[20px] w-[56%] md:-ml-20 lg:-ml-0'>Cover Photo:</h1>
             <form
  action=""
  className="flex flex-col justify-center items-center border-2 border-dashed border-black xs:h-[100px] xs:w-[200px] md:h-[150px] md:w-[400px] cursor-pointer rounded-md mb-10"
>
  <input
    className="hidden"
      type="file"
      accept="image/*"
      onChange={(e) => handleImage(e, 'image2')}
      id="file-input2"
  />
  <label htmlFor="file-input2">
       {image2 ? (
  <img
    src={image2}
    height={20}
    className="xs:w-[50px] sm:w-[70px] md:w-[110px]"
    alt={profile}
  />
) : personal?.profile?.cover ? (
  <img
    src={personal?.profile?.cover}
    height={20}
    className="xs:w-[50px] sm:w-[70px] md:w-[110px]"
    alt={profile}
  />
) : (
  <BiUpload color="#1475cf" size={60} />
)}
    </label>
</form>
            <div className='w-[60%] flex justify-between md:mt-2 xs:mt-28'>
            <Button
                    
                    style={{
                      width:"50%",
                      color:"#B8C0C7",
                      }}
                      onClick={() => {SetPage(page - 1);}}
                    >
                    BACK
                    </Button>
                    <Button
                    variant="contained"
                    style={{
                      width:"50%",
                      background:"#2C3A8E",
                      color:"#ffff",
                      }}
                    onClick={() => {
                     if (personal.profile !== null) {
                        updateData();
                        Upload();
                      } else {
                        addData();
                        addlink();
                        addimages();
                        Upload();}
                    }}
                    >
                    Upload
                    </Button>
                    </div>
          </div>
        </>
      );
    default:
      return null;
  }
})()}
          </div>
          </div>
        )
      }

export default PersonalL
