import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useLocation, useNavigate } from 'react-router-dom';


const MyComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeSlide, setActiveSlide] = useState(0);
  
    // Define the URL parameter name
    const paramName = 'slide';
  
    // Get the current URL parameters
    const searchParams = new URLSearchParams(location.search);
  
    // Set the active slide based on the URL parameter
    useEffect(() => {
      const slideParam = searchParams.get(paramName);
      if (slideParam) {
        const slideIndex = parseInt(slideParam, 10);
        if (!isNaN(slideIndex)) {
          setActiveSlide(slideIndex);
        }
      }
    }, [location.search]);
  
    // Update the URL parameter when the active slide changes
    useEffect(() => {
      searchParams.set(paramName, activeSlide.toString());
      navigate({ search: searchParams.toString() });
    }, [activeSlide, navigate, searchParams]);
  
    // Handle the slide change event
    const handleSlideChange = (swiper) => {
      setActiveSlide(swiper.realIndex);
    };
  
    return (
      <Swiper onSlideChange={handleSlideChange}>
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    );
  }

export default MyComponent;