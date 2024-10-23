  import React , {useState , useEffect} from 'react';
  import { BarChart , Bar,CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
  import { IoMdSettings } from "react-icons/io";
  import goma from '../assets/goma.png'
  import { FaLongArrowAltRight } from "react-icons/fa";
  import line from '../assets/Line.png'
  import MenuItem from '@mui/material/MenuItem';
  import FormControl from '@mui/material/FormControl';
  import Select from '@mui/material/Select';
  import axios from 'axios';
  import { IoMailOutline } from "react-icons/io5";
  import { CiLock } from "react-icons/ci";
  import { useNavigate } from 'react-router-dom';
  const Dashboard = () => {
    const [startDate, setStartDate] = useState('');
    const [startDate2, setStartDate2] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endDate2, setEndDate2] = useState('');
    const [socialVal, setSocialVal] = useState('2');
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [settings,setSettings] = useState(false)
    const[links_views ,setLinks_views ]=useState([])
    const[lin ,setLin ]=useState([])
    const [address_link,setAddress_link]=useState([])
    console.log(socialVal,"socialVal")
    const [personal,setPersonal] = useState([])
    const navigate=useNavigate()
    // const[data ,setData ]=useState([])
    // console.log(data,"asdss")
    // console.log(endDate2,"endDate2")
  const handleChange = (event) => {
    setSocialVal(event.target.value);
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
      
      console.log("perssss",personal)

    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(()=>{
    fetchpers();
  },[])

  const APILIN = `http://127.0.0.1:8000/api/link`;
  // const { t } = useTranslation();
  const fetchlin = async () => {
    try {
      const response = await axios.get(APILIN, {
        headers: {
          // Include any required headers here
          // Example:
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ContentType:'application/json'
        },
      });
      setLin(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  React.useEffect(()=>{
    fetchlin();
  },[])

  const address = `http://127.0.0.1:8000/api/statistics/locations_for_link?start_date=${startDate}&end_date=${endDate}&id_link=${socialVal}`;
  // const { t } = useTranslation();
  const fetchaddress = async () => {
    try {
      const response = await axios.get(address, {
        headers: {
          // Include any required headers here
          // Example:
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ContentType:'application/json'
        },
      });
      setAddress_link(response.data)
      // setData(links_views.links_views);
      console.log('address:', address_link);
      // console.log("visit:",visit)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  React.useEffect(()=>{
    fetchaddress();
  },[startDate,endDate,socialVal])

    const visit = `http://127.0.0.1:8000/api/statistics/number_of_visits?start_date=${startDate2}&end_date=${endDate2}`;
  // const { t } = useTranslation();
  const fetchData = async () => {
    try {
      const response = await axios.get(visit, {
        headers: {
          // Include any required headers here
          // Example:
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          ContentType:'application/json'
        },
      });
      setLinks_views(response.data.links_views)
      // setData(links_views.links_views);
      console.log('data:', links_views);
      // console.log("visit:",visit)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  React.useEffect(()=>{
    fetchData();
  },[startDate2,endDate2])

   useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    const handleClickOutsideSettings = (event) => {
      // Check if the clicked element is not part of the settings menu
      if (!event.target.closest('.settings-menu')) {
        setSettings(false); // Close the settings menu
      }
    };

    // Add event listener for clicks on the document
    document.addEventListener('click', handleClickOutsideSettings);

    // Cleanup function to remove the event listener when component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutsideSettings);
    };
  }, []);

    return(
      <div className='w-screen h-screen '>
        <div className='flex justify-between items-center max-w-[1240px] mx-auto mb-32 mt-10'>
            <img src={goma} alt="" />
            <h1 className='text-[20px]'>Dashboard</h1>
            <IoMdSettings 
  onClick={(event) => {
    event.stopPropagation();
    setSettings(!settings);
  }} 
  className='cursor-pointer'
/>
        </div>
        {settings?
            <div className='absolute right-8 top-20 bg-white h-fit z-10'  onClick={(event) => {
    event.stopPropagation();
    setSettings(true); }} >
              <div className='flex flex-col '>
                <div>
              {`${personal?.profile?.cover}`=={}?<div className='bg-white w-full h-20'></div>:<img src={personal?.profile?.cover} alt="" className='w-full h-32'/>}
              <img src={personal?.profile?.photo} alt="" className='w-20 h-20 -mt-8 mx-auto rounded-full'/>
              </div>
              <p className='mx-auto'>{personal?.profile?.firstName} {personal?.profile?.lastName}</p>
              <div className='flex flex-col justify-start items-start'>
                <div className='flex justify-start item-center border-t mx-auto gap-4 border-gray-300 w-48 pt-1'>
                <IoMailOutline size={25} color='#2075B9'/>
                <p  onClick={() => navigate('/changeemail')}>Edit email</p>
                </div>
                <div className='flex justify-start item-center border-t mx-auto gap-4 w-48 pt-1' >
                <CiLock size={25} color='#2075B9' />
                <p onClick={() => navigate('/changepassword')}>Edit password</p>
                </div>
              </div>
              </div>
            </div>
            :
            ''
            }
      <div className='ml-5' style={{ display: 'flex', flexDirection: "column" , justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className='bg-[#EBEBEB] mb-10'>
        <div className='flex justify-end item-center my-5 sm:mr-10 xs:mr-0 gap-4 h-10'>
              <input type="date" class="bg-gray-50 rounded-3xl p-3" placeholder="Select start date" onChange={(e)=>{setStartDate2(e.target.value)}}></input>
      <FaLongArrowAltRight size={30} className='mt-1'/>
      <input type="date" class="bg-gray-50 rounded-3xl p-3" placeholder="Select end date" onChange={(e)=>{setEndDate2(e.target.value)}}></input>
        </div>
        
    <BarChart
      width={screenWidth-60}
      height={300}
      data={links_views}
      className='xs:ml-2 sm:ml-0'
    >
      
      <CartesianGrid strokeDasharray="3 3" />
      
      <XAxis dataKey="name"/>
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="visit" fill="#8884d8"  barSize={15} shape={<RoundedRectangle />}/>
    </BarChart>
    </div>
    <div className='bg-[#EBEBEB]'>
        <div className='flex justify-end item-center my-5 sm:mr-10 xs:mr-0 gap-4 h-10'>
              <input type="date" class="bg-gray-50 rounded-3xl p-3" placeholder="Select start date" onChange={(e)=>{setStartDate(e.target.value)}}></input>
      <FaLongArrowAltRight size={30} className='mt-1'/>
      <input type="date" class="bg-gray-50 rounded-3xl p-3" placeholder="Select end date" onChange={(e)=>{setEndDate(e.target.value)}}></input>
      <img src={line} alt="" className='xs:hidden sm:block'/>
      <div className='-mt-1 xs:hidden sm:block'>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
      value={socialVal}
      onChange={handleChange}
      displayEmpty
      className='h-12'
    >
      
      {lin.map((item, index) => (
        <MenuItem key={index} value={item.id}>
          <div className='flex items-center gap-5'>
            <img src={item.logo} alt="" className='w-10 h-auto rounded-3xl' />
            <p>{item.name}</p>
          </div>
        </MenuItem>
      ))}
    </Select>
      </FormControl>
    </div>
        </div>
        
    <BarChart
      width={screenWidth-60}
      height={300}
      data={address_link}
      // margin={{
      //   top: 5, right: 30, left: 20, bottom: 5,
      // }}
      className='xs:ml-2 sm:ml-0'
    >
      
      <CartesianGrid strokeDasharray="3 3" />
      
      <XAxis dataKey="address"/>
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="visit" fill="#8884d8"  barSize={15} shape={<RoundedRectangle />}/>
    </BarChart>
    </div>
    </div>
    </div>
    );
};

  const RoundedRectangle = (props) => {
  const { x, y, width, height } = props;

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={5} ry={5} fill="#8884d8" />
    </g>
  );
}

  export default Dashboard;