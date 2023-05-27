import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, Navigate } from 'react-router-dom';
import axios from "axios";
import  TestImage from '../../assets/images/testPicture.jpg';
import Card from '../Card';

//Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
//import { useSwipeable } from 'react-swipeable';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




SwiperCore.use([Navigation, Pagination]);

const MyComponent = (scannedResult) => {
  const [product, setProduct] = useState(null);
  const [data, setData] = useState([]);
  const {productId} = useParams();
  //const [productId, setProductId] = useState(null);

  //Swiper Ref for current instance
  const swiperRef = useRef(null);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const scannedIndex = urlParams.get('id');
  const [activeIndex, setActiveIndex] = useState(0);
  const [defaultURL, setDefaultURL] = useState();
  const navigate = useNavigate();


  // Get All Project and Save it to data
  useEffect(() => {
    axios.get('https://localhost:7294/api/Product')
    .then(response => setData(response.data))
    .catch(error => console.log(error));
    }, []);

 
  useEffect(() => {
      if (data.length > 0 && scannedIndex === null) {
        const selectedProduct = data.find((p) => p.sequences === productId);
        console.log("THIS IS WHERE IT BEGINS: THE SCANNED ID IS: " + scannedIndex)
        setProduct(selectedProduct);
        navigate('/scan/1');       
      } 
      else if (data.length > 0 && scannedIndex != null){ //Not sure yet about this do not delete
        const selectedProduct = data.find((p) => p.sequences === scannedIndex);
        console.log("NO MORE NALL. THE SCANNEDID IS: " + scannedIndex)
        navigate(`/scan/${scannedIndex}`); 

        setProduct(selectedProduct);
      } 

     


    }, [data, productId]);


    // useEffect(() => { 
    //   if (swiperRef.current) {
    //     console.log("NOT NULL ANYMORE ");
    //     swiperRef.current.swiper.slideTo(scannedIndex);
    //   }
    // }, []);
   
    const [currentProjectId, setCurrentProjectId] = useState(1);

    // Button Right 
    const handleNextProject = () => {
      const nextProjectId = currentProjectId === data.length ? 1 : currentProjectId + 1;
      setCurrentProjectId(nextProjectId);
    };
    // Button Left 
    const handlePreviousProject = () => {
      const previousProjectId = currentProjectId === 1 ? data.length : currentProjectId - 1;
      setCurrentProjectId(previousProjectId);
    };

    // No URL params : set "/scan/2" 
    // if (productId === undefined) {
    //   // Route parameter is empty, navigate to "scan/1"
    //   console.log("The productId is currently undefined!!!")
    //   console.log("The current scanned item  with product Id is: " + scannedIndex)
    //   return <Navigate to="/scan/1" replace />;      
    // }
    


    //swiper parameters
    const swiperParams = {
      spaceBetween: 10,
      slidesPerView: 1,
      // onSlideChange:{handleNextProject}
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    };

    const handleSwipe = (swiper) => {

      if (swiperRef.current) {
        const swiperInstance = swiperRef.current.swiper;
        const slideIndex = swiperInstance.realIndex;
        setActiveIndex(swiper.activeIndex);

        //swiper.slideTo(scannedIndex);
        window.history.pushState(null, null, `/scan/${swiper.activeIndex + 1}`);

        console.log("The current slide index is: " + slideIndex);

      }
    
    };

  return (
    <div>
      {/* Test button Rout */}
      <h1>Title</h1>
      {/* <button onClick={handlePreviousProject}><Link to={`/scan/${currentProjectId}`}>previous</Link></button>
      <button onClick={handleNextProject}><Link to={`/scan/${currentProjectId}`}>Next</Link></button> */}

      {product ? (
        
        <Swiper ref={swiperRef} onSlideChange={handleSwipe}  {...swiperParams}>
        {data.map((product, index) => (
          <SwiperSlide key={product.sequences}>
            <Link to={`/scan/${currentProjectId}`}></Link>
            <div className="card">
            <Card
                productName = {product.productName}
                image={TestImage}
                description={product.description}
                sequence={product.sequences}

                
            />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    
      ) : (
        <p>Loading...</p>
      )}

    
    </div>
  );
  }

export default MyComponent;


//WORKING CODE WITH CARD 
{/* WORKING CODE WITHOUT SWIPER */}
      {/* {product ? (
          <Card 

          productName = {product.productName}
          image = {TestImage}
          description={product.description}   
          /> */}

{/* PREVIOUS CODE - NO CARD */}
  {/* <div>

        <h1>{product.title}</h1>
        <img src={TestImage} width={200} height={200}/> 
        <p>{product.description}</p>
       </div> */}