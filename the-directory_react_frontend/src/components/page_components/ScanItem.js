import React from 'react';
import '../../assets/styles/Nav.css';
import '../../assets/styles/W3.css';
import '../../assets/styles/ScanItem.css';
import testImage from '../../assets/images/testPicture.jpg'

//New temp card css import
import '../../assets/styles/Card.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 

import { useState, useEffect } from "react";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../../firebase";
    
// URL Params
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from "axios";

//Swiper Component imports
//import Slider from '../components/page_components/Slider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useRef } from 'react';

export default function ScanItem(){
    //Flip tracker
    const [isFlipped, setIsFlipped] = useState(false);
    const handleClick = () => {
        setIsFlipped(!isFlipped);
      };


    const {productId} = useParams();
    const [dictionary, setDictionary] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const imagesListRef = ref(storage, "images/");
    const [products, setProducts] = useState([]);
    const [data, setData] = useState([]);


    //Swiper payload
    const [productPerPage, setProductPerPAge] = useState([]);
    const [pageLimit, setPageLimit] = useState([]);


    useEffect(() => {
        axios.get('https://localhost:7294/api/Product')
        .then(response => setData(response.data))
        .catch(error => console.log(error));

        const getAllProducts = async () => {
            const res = await fetch(
                'https://localhost:7294/api/Product'
            );
            const data = await res.json();
            setAllProducts(data.allProducts);

            listAll(imagesListRef).then((response) => {
                response.items.forEach((item) => {
                    getDownloadURL(item).then((url => {
                            data.forEach((product)=>{
                                if (product.imageAccessNumber == item.name){
                                        setDictionary(prevDictionary => ({
                                            ...prevDictionary,
                                            [product.id]: url
                                    }));
                                }
                            })
                    }));
                    });
                });
        }

        const getProducts = async () => {
            const res = await fetch(
                'https://localhost:7294/api/Pages/1'
            );

            const data = await res.json();
            setProducts(data.products);

            //Swiper Payload
            setProductPerPAge(JSON.parse(JSON.stringify(data)));
            setPageLimit(data.pages);
        }
        getProducts();
        getAllProducts()
        }, []);
        const filteredData = Array.isArray(data) ? data.filter(item => item.id === productId) : console.log("NA");



    const fetchProducts = async (currentPage) => {

        const requestURL = "https://localhost:7294/api/Pages/" + currentPage;
        const res = await fetch(
            requestURL
        );
        const data = await res.json();
        return (data.products);
    };
    
    const handlePageClickNext = async (data) =>{
        productPerPage.currentPage = productPerPage.currentPage + 1;
        console.log("The current page is: " + productPerPage.currentPage)
        let currentPage = productPerPage.currentPage;

        if (currentPage < productPerPage.pages + 1)
        {
            const productsFormsServer = await fetchProducts(currentPage);
            setProducts(productsFormsServer);
            SlideRef.current.swiper.slideTo(0,0,false)
            //onSlideChange();

            console.log("AFTER: The Data page is: " + currentPage); //PASSED!!!            
        }
        else
        {
        }
    }

    const handlePageClickPrev = async (data) =>{
        if (productPerPage.currentPage != 1)
        {        
            productPerPage.currentPage = productPerPage.currentPage - 1;
            const productsFormsServer = await fetchProducts(productPerPage.currentPage);
            setProducts(productsFormsServer);
            SlideRef.current.swiper.slideTo(2,0,false)
            console.log("AFTER: MADE it back. Data page is: " + productPerPage.currentPage); //PASSED!!!  
        }
    }


     //Swiper Functions
    const [slideBegOrNot, handleSlideByState] = useState({
        isFirst: true,
        isLast: false,
    })
    const SlideRef = useRef();

    const handleNext = () => {        
        SlideRef.current.swiper.slideNext();

    }

    const handlePrev = () => {
        
        SlideRef.current.swiper.slidePrev();
    }

    const onSlideChange = swiper => {
        handleSlideByState({
            isFirst: swiper.isBeginning,
            isLast: swiper.isEnd,
        });
    };
    const { isLast, isFirst } = slideBegOrNot;

        
    return (
        <div>
            {/* Browser */}
            <BrowserView>
                <div className="DesktopScanItem">
                    <div className="w3-card-4 w3-border DesktopScanItem">
                        <header className="w3-container w3-white">
                            <h1 className='DesktopItemName'>props.itemName</h1>
                        </header>

                        <div className="w3-container DesktopScanItemDescription">
                            props.itemDescription
                        </div>
                        <br></br>
                        <div className="w3-container">
                            imageName: props.itemImageName
                        </div>
                    </div>
                </div>
                <br></br>
            </BrowserView>

            {/* Mobile */}
            <MobileView>
                
            {filteredData.map((product) => {
                        {Object.entries(dictionary).map((dic) => {
                            if (dic[0] == product.id){
                                product.imageAccessNumber = dic[1]
                            }
                        })}
                    })}


            {filteredData.map(item => (
                <div>
                    <div className="bs-icons">
                        <BsArrowLeft id='arrowLeft' onClick= {()=> {isFirst ? handlePageClickPrev(): handlePrev()}}/>
                        <BsArrowRight id='arrowRight'  onClick= {()=> {isLast ? handlePageClickNext(): handleNext()}}/>            
                    </div>
                <div>
                <Swiper
                slidesPerView={1}
                spaceBetween={0}
                className={'mySwiper'}
                ref={SlideRef}
                onSlideChange={onSlideChange}
                pagination={{
                    el: '.swiper-paginate-controls',
                    type: 'fraction',
                }}
                navigation={false}
                modules={[Pagination, Navigation]}
                >

                <div className={`card ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
                <div className="card-inner">
                    <div className="card-front">

                    <header className="w3-container w3-white">
                        <h1 style={{fontSize: '6vw'}}>{item.productName}</h1>
                    </header>
                        <div style={{fontSize: '3vw'}}>
                            <br></br>
                            <div className="w3-container">
                                <img
                                className='itemImage'
                                src = {testImage}                                
                                />
                            </div>
                        </div>                       
                </div>

                <div className="card-back">
                    <header className="w3-container w3-white">
                        <h1 style={{fontSize: '6vw'}}>{item.description}</h1>
                    </header>
                        {/* <h3 className="w3-container w3-white">{props.description}</h3> */}
                        <p>This is the back of the card.</p>
                </div>
                </div>
                </div>
                </Swiper>
                </div>
                </div>
            ))}



</MobileView>
           
        </div>
    )
}
