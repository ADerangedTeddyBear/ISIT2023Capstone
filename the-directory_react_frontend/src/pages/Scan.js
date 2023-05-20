import ReactPaginate from 'react-paginate';
import ScanItem from '../components/page_components/ScanItem';
import { useEffect, useState } from 'react';
import '../assets/styles/Styles.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 

//New Card implement 
import Card from '../components/Card';
import MobileCard from '../components/MobileCard';

//Swiper Component imports
//import Slider from '../components/page_components/Slider';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { useRef } from 'react';
//Swiper components END



// Iamge_import
import {
  ref,
  getDownloadURL,
  listAll,
  getMetadata,
  getStorage
} from "firebase/storage";
import { storage } from "../firebase";

export default function Scan(){
    // Image list
    const [imageUrls, setImageUrls] = useState([]);
    const imagesListRef = ref(storage, "images/");

    // Create a reference to the file whose metadata we want to retrieve

    const [products, setProducts] = useState([]);
    const [pageLimit, setPageLimit] = useState([]);
    const [dictionary, setDictionary] = useState({});

    const [allProducts, setAllProducts] = useState([]);

    
    //Swiper payload
    const [productPerPage, setProductPerPAge] = useState([]);
    
    useEffect(() => {
        const getAllProducts = async () => {
            const res = await fetch(
                'https://localhost:7294/api/Product'
            );
            const data = await res.json();
            setAllProducts(data.allProducts);
            //console.log(data)

            data.forEach((item)=>{
                console.log(item)
            })

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
        getAllProducts()

 const getProducts = async () => {
            const res = await fetch(
                'https://localhost:7294/api/Pages/1'
            );

            const data = await res.json();
            setProducts(data.products);

            //Swiper Payload
            setProductPerPAge(JSON.parse(JSON.stringify(data)));

        

            // Check Mondo DB
            // data.products.forEach((item)=>{
            //     console.log(item)
            // })

            // listAll(imagesListRef).then((response) => {
            //     response.items.forEach((item) => {
            //         getDownloadURL(item).then((url => {
            //                 data.products.forEach((product)=>{
            //                     //console.log(product.imageAccessNumber, item.name)
            //                     if (product.imageAccessNumber == item.name){
            //                             setDictionary(prevDictionary => ({
            //                                 ...prevDictionary,
            //                                 [product.id]: url
            //                         }));
            //                     }
            //                 })

            //         }));
            //         });
            //     });

            setPageLimit(data.pages);
        }

        getProducts();
        }, []);

    const fetchProducts = async (currentPage) => {

        const requestURL = "https://localhost:7294/api/Pages/" + currentPage;
        const res = await fetch(
            requestURL
        );

        const data = await res.json();
        return (data.products);
    };
    
    const handlePageClickNext = async (data) =>{
        //console.log("The Data page limit is: " + pageLimit); //PASSED!!!
        //console.log("The Data page limit is: " + products[0].id); PASSED!!!
        //console.log("I AM THE LAST!!!"); //PASSED!!!
        //console.log("BEFORE: The Data page is: " + productPerPage.currentPage); //PASSED!!!
        //console.log("The current slide is: " + SlideRef.current.swiper.activeIndex)
        //console.log("The current slide is: " + SlideRef.current.swiper.slideReset())


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
            //Put end logic here

        }
               
    }

    const handlePageClickPrev = async (data) =>{
        // console.log("The Data page limit is: " + pageLimit); PASSED!!!
        //console.log("The Data page limit is: " + products[0].id); PASSED!!!
        //console.log("I AM THE LAST!!!"); //PASSED!!!
        //console.log("The Data page is: " + productPerPage.currentPage); //PASSED!!!

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

    const printConsole = () => {
        console.log("Reached the end of the scrolling");
    }

    const { isLast, isFirst } = slideBegOrNot;

    //PREVIOUS HANDLER
    // const handlePageClick = async (data) =>{

    //     let currentPage = data.selected + 1;

    //     const productsFormsServer = await fetchProducts(currentPage);

    //     setProducts(productsFormsServer);
    // }

    //UPDATED RETURN CODE
    return (
        <div>

            {/* Swiper Test BEGIN */}

            {/* <div className='swiper-paginate-controls'></div> */}
            <div className="bs-icons">
                <BsArrowLeft id='arrowLeft' onClick= {()=> {isFirst ? handlePageClickPrev(): handlePrev()}}/>
                <BsArrowRight id='arrowRight'  onClick= {()=> {isLast ? handlePageClickNext(): handleNext()}}/>            


                {/* <BsArrowLeft id='arrowLeft' className={`Arrow ${isFirst ? 'disabled': ''}`} onClick={handlePrev}/>
                <BsArrowRight id='arrowRight' className={`Arrow ${isLast ? 'disabled': ''}`} onClick={handleNext}/> */}
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
                        {products.map((product) => {
                            {Object.entries(dictionary).map((dic) => {
                                if (dic[0] == product.id){
                                    product.imageAccessNumber = dic[1]
                                    //console.log(dic[0], product.id, dic[1])
                                }
                            })}

                            return (
                                <SwiperSlide>   
                                
                                
                                    <div className='row m-2'>
                                        <div key={product.id}>
                                            <ScanItem itemName = {product.productName} itemDescription ={product.description} itemImageName = {product.imageAccessNumber}/>
                                        </div>                                
                                    </div>                       

                                </SwiperSlide>
                                
                            );
                        })}
                    
                
                </Swiper>
            </div>

                 {/* Swiper Test END */}    
            
                 </div>
    )
}



    //PREVIOUS RETURN CODE
    // return (
    //     <div>

    //     <BrowserView>
    //     <div className='container'>
    //         <div className='row m-2'>
    //             {/* {console.log(dictionary)} */}
    //             {/* {console.log(typeof(Object.keys(dictionary)))} */}
    //             {/* {console.log(Object.values(dictionary))} */}
    //             {products.map((product) => {
    //                 {Object.entries(dictionary).map((dic) => {
    //                     if (dic[0] == product.id){
    //                         product.imageAccessNumber = dic[1]
    //                         //console.log(dic[0], product.id, dic[1])
    //                     }
    //                 })}
    //                 return (
    //                     <div key={product.id}>
    //                         <ScanItem itemName = {product.productName} itemDescription ={product.description} itemImageName = {product.imageAccessNumber}/>
    //                     </div>
    //                 );
    //             })}
    //         </div>
    //     </div>

    //     <div>
    //         <ReactPaginate
    //             previousLabel={'Previous'}
    //             nextLabel={'Next'}
    //             breakLabel={'...'}
    //             pageCount={pageLimit}
    //             marginPagesDisplayed={3}
    //             pageRangeDisplayed={3}
    //             onPageChange={handlePageClick}
    //             containerClassName={'pagination justify-content-center'}
    //             pageClassName={'page-item'}
    //             pageLinkClassName={'page-link'}
    //             previousClassName={'page-item'}
    //             previousLinkClassName={'page-link'}
    //              nextClassName={'page-item'}
    //             nextLinkClassName={'page-link'}
    //             breakClassName={'page-item'}
    //             breakLinkClassName={'page-link'}
    //             activeClassName={'active'}
    //         />
    //     </div>      
    //     </BrowserView>
    //     <MobileView>
    //         {/* ReactPaginate Pending Removal */}
    //     <div>
    //         <ReactPaginate 
    //             previousLabel={'Previous'}
    //             nextLabel={'Next'}
    //             breakLabel={'...'}
    //             pageCount={pageLimit}
    //             marginPagesDisplayed={3}
    //             pageRangeDisplayed={3}
    //             onPageChange={handlePageClick}
    //             containerClassName={'pagination justify-content-center'}
    //             pageClassName={'page-item'}
    //             pageLinkClassName={'page-link'}
    //             previousClassName={'page-item'}
    //             previousLinkClassName={'page-link'}
    //              nextClassName={'page-item'}
    //             nextLinkClassName={'page-link'}
    //             breakClassName={'page-item'}
    //             breakLinkClassName={'page-link'}
    //             activeClassName={'active'}
    //         />
    //     </div>    
    //     <div className='container'>
    //         <div className='row m-2'>

    //             {products.map((product) => {
    //                 return (
    //                     <div key={product.id}>
    //                         <ScanItem itemName = {product.productName} itemDescription ={product.description} itemImageName = {product.imageAccessNumber}/>


                          
    //                     </div>
    //                 );
    //             })}

                

    //         </div>             
    //     </div>   
    //     </MobileView>




    //     </div>
    // )


/*PREVIOUS CODE
import React, { useState, useEffect } from 'react';
import '../assets/styles/Styles.css';

export default function Scan(){
    const [testStuff, setTestStuff] = useState([]);

    useEffect ( () => {
        fetch('http://localhost:1625/api/product')
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error ("Server not up or malfunctioning");
        })
        .then((res) => {
            setTestStuff(res);
            console.log(res);
            console.log(testStuff)
        })
        .catch((err) => console.log(err));

        }, [])

    return (
        <div>
            <h1>Scan</h1>
            <h3>Data is below: </h3>
            {JSON.stringify(testStuff)}
        </div>
    )
}


 <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                                <div className="card-body">
                                    <h5 className="card-title text-center h2">Product Name: {product.productName}</h5>
                                    <h5 className="card-title text-center h2">Price: {product.imgSrc}</h5>
                                    <p className="card-text">Description: {product.description}</p>
                                </div>
                            </div>*/
