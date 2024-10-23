import React, { useState , useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import '../App.css';
import Templpate1 from './Templpate1';
import Template2 from './Template2';


SwiperCore.use([Navigation]);

const SwiperS = ({changeColor , slideId}) => {
  const gradientColors = {
    red: 'red',
    blue: 'blue',
    green: 'green',
    black: 'black',
    yellow: 'yellow',
  };
  
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [mainBoxColor, setMainBoxColor] = useState('yellow');

    const handleSlideChange = (swiper) => {
    slideId(swiper.realIndex + 1)
    setCurrentIndex(swiper.realIndex); // Update currentIndex when slide changes
  };

console.log(currentIndex,"currentIndex")

  const images = [
    { image: <Templpate1 color={mainBoxColor} />, index: '1' },
    { image: <Template2 color={mainBoxColor} />, index: '2' },
  ];
  
  
  const handleSmallBoxClick = (color) => {
    changeColor(gradientColors[color])
    setMainBoxColor(gradientColors[color]);
    // window.location.reload();
  };

  

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="swiper-container w-[100%]">
          <div className="swiper-wrapper">
            <Swiper
              spaceBetween={50}
              slidesPerView={1}
              loop={true}
              effect={'cards'}
              grabCursor={true}
              navigation={true}
              modules={[Navigation]}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              onSlideChange={handleSlideChange}
              style={{ width: '100%', height: '460px' }}
            >
              {images.map((feat, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    borderRadius: '11px',
                    overflow: 'hidden',
                    borderImage: gradientColors[mainBoxColor],
                    borderImageSlice: 1,
                    background: mainBoxColor,
                    overflowY:"auto",
                    // border:"1px solid" ,
                    color:
                      mainBoxColor === gradientColors.red
                        ? 'black'
                        : mainBoxColor === gradientColors.blue
                        ? 'white'
                        : mainBoxColor === gradientColors.green
                        ? 'red'
                        : '',
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <div>{feat.image}</div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div>
          <SmallBox color="red" onClick={handleSmallBoxClick} />
          <SmallBox color="blue" onClick={handleSmallBoxClick} />
          <SmallBox color="green" onClick={handleSmallBoxClick} />
          <SmallBox color="black" onClick={handleSmallBoxClick} />
          <SmallBox color="yellow" onClick={handleSmallBoxClick} />
        </div>
      </div>
      {/* <TemplatePreview mainBoxColor={mainBoxColor} /> */}
      {/* <div className='hidden'>
      <TemplatePreview mainBoxColor={mainBoxColor}/>
      </div> */}
    </div>
  );
};

function SmallBox({ color, onClick }) {
  const gradientColors = {
    red: 'linear-gradient(45deg, red, yellow)',
    blue: 'linear-gradient(45deg, blue, cyan)',
    green: 'linear-gradient(45deg, green, lime)',
    black: 'linear-gradient(45deg, black, white)',
    yellow: 'linear-gradient(45deg, yellow, lime)',
  };
  return (
    <div
      style={{
        width: '32px',
        height: '32px',
        backgroundImage: gradientColors[color],
        display: 'inline-block',
        margin: '10px',
        cursor: 'pointer',
      }}
      onClick={() => onClick(color)}
    ></div>
  );
}

export default SwiperS;