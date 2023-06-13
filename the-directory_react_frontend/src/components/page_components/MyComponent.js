import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import TestImage from '../../assets/images/testPicture.jpg';
import Card from '../Card';

// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';

import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../../firebase";

SwiperCore.use([Navigation, Pagination]);

const MyComponent = () => {
  const [data, setData] = useState([]);
  const { productId } = useParams();
  const swiperRef = useRef(null);
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const scannedIndex = urlParams.get('id');
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();


  const [dictionary, setDictionary] = useState({});
  const imagesListRef = ref(storage, "images/");

  document.title = "Card List"

  useEffect(() => {
    axios
      .get('https://mongodbbackend.azurewebsites.net/api/product')
      .then(response => setData(response.data))
      .catch(error => console.log(error));
  
    const getAllProducts = async () => {
      const res = await fetch('https://mongodbbackend.azurewebsites.net/api/product');
      const data = await res.json();
  
      listAll(imagesListRef)
        .then(response => {
          const downloadPromises = response.items.map(item => {
            return getDownloadURL(item).then(url => {
              return { name: item.name, url };
            });
          });
  
          Promise.all(downloadPromises)
            .then(downloads => {
              const updatedData = data.map(product => {
                const matchingDownload = downloads.find(
                  download => download.name === product.imageAccessNumber
                );
  
                if (matchingDownload) {
                  return { ...product, imageAccessNumber: matchingDownload.url };
                }
  
                return product;
              });
  
              setData(updatedData);
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    };
  
    getAllProducts();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      let selectedProduct;
      if (scannedIndex === null) {
        selectedProduct = data.find(p => p.sequences === productId);
      } else {
        selectedProduct = data.find(p => p.sequences === scannedIndex);
        navigate(`/scan/${scannedIndex}`);
      }
      if (selectedProduct) {
        const selectedIndex = data.findIndex(p => p.sequences === selectedProduct.sequences);
        setActiveIndex(selectedIndex);
        swiperRef.current.swiper.slideTo(selectedIndex);
      }
    }
  }, [data, productId, scannedIndex, navigate]);

  const handleSwipe = (swiper) => {
    const slideIndex = swiper.realIndex;
    setActiveIndex(slideIndex);
    const product = data[slideIndex];
    const productId = product ? product.sequences : '';
    navigate(`/scan/${productId}`);

    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(slideIndex);
    }
  };

  return (
    <div>
      {data.length > 0 ? (
        <Swiper ref={swiperRef} onSlideChange={handleSwipe} initialSlide={activeIndex} navigation pagination>
          {data.map((product) => (
            <SwiperSlide key={product.sequences}>
              <Link to={`/scan/${product.sequences}`} />
              {/* <div className="card">

              </div> */}
              <Card
                product={product}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MyComponent;
