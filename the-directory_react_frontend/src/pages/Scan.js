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

// URL Params
import { Link, useParams, useSearchParams } from 'react-router-dom';


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
    // URL Params
    const {productId} = useParams();
    const [clickable, setClickable] = useState(true);
    // // URL Search Parameter
    // const [searchParams, setSearchParams] = useSearchParams();
    // const [query, setQuery] = useState(searchParams.get('query'));

    useEffect(() => {
        const getAllProducts = async () => {
            const res = await fetch(
                'https://localhost:7294/api/Product'
            );
            const data = await res.json();
            setAllProducts(data.allProducts);
            //console.log(data)

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
    
    // const handlePageClickNext = async (data) =>{
    //     productPerPage.currentPage = productPerPage.currentPage + 1;
    //     console.log("The current page is: " + productPerPage.currentPage)
    //     let currentPage = productPerPage.currentPage;

    //     if (currentPage < productPerPage.pages + 1)
    //     {
    //         const productsFormsServer = await fetchProducts(currentPage);
    //         setProducts(productsFormsServer);
    //         SlideRef.current.swiper.slideTo(0,0,false)
    //         //onSlideChange();

    //         console.log("AFTER: The Data page is: " + currentPage); //PASSED!!!            
    //     }
    //     else
    //     {
    //         //Put end logic here

    //     }
               
    // }

    // const handlePageClickPrev = async (data) =>{
    //     if (productPerPage.currentPage != 1)
    //     {        
    //         productPerPage.currentPage = productPerPage.currentPage - 1;
    //         const productsFormsServer = await fetchProducts(productPerPage.currentPage);
            
    //         setProducts(productsFormsServer);
    //         SlideRef.current.swiper.slideTo(2,0,false)

    //         console.log("AFTER: MADE it back. Data page is: " + productPerPage.currentPage); //PASSED!!!  
    //     }

    // }


     //Swiper Functions
    // const [slideBegOrNot, handleSlideByState] = useState({
    //     isFirst: true,
    //     isLast: false,
    // })
    // const SlideRef = useRef();

    // const handleNext = () => {        
    //     SlideRef.current.swiper.slideNext();

    // }

    // const handlePrev = () => {
        
    //     SlideRef.current.swiper.slidePrev();
    // }

    // const onSlideChange = swiper => {
    //     handleSlideByState({
    //         isFirst: swiper.isBeginning,
    //         isLast: swiper.isEnd,
    //     });
    // };
    // const { isLast, isFirst } = slideBegOrNot;

    //UPDATED RETURN CODE
    return (
        <div>
            <ScanItem></ScanItem>
            {/* {products.map((product) => {
                            {Object.entries(dictionary).map((dic) => {
                                if (dic[0] == product.id){
                                    product.imageAccessNumber = dic[1]
                                }
                            })}
                            return (
                                <SwiperSlide>   
                                    <div className='row m-2'>
                                        <div key={product.id}>
                                            <Link style={{pointerEvents: clickable ? '' : 'none'}} to={`/scan/${product.id}`}></Link>
                                        </div>                                
                                    </div>                       
                                </SwiperSlide>
                            );
                        })}         */}

        </div>
    )
}

// PREVIOUS CODE FOR return
{/* <div className="bs-icons">
                <BsArrowLeft id='arrowLeft' onClick= {()=> {isFirst ? handlePageClickPrev(): handlePrev()}}/>
                <BsArrowRight id='arrowRight'  onClick= {()=> {isLast ? handlePageClickNext(): handleNext()}}/>            
            </div> */}
                   
            {/* <div>
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
                > */}
                        {/* {products.map((product) => {
                            {Object.entries(dictionary).map((dic) => {
                                if (dic[0] == product.id){
                                    product.imageAccessNumber = dic[1]
                                }
                            })}
                            return (
                                <SwiperSlide>   
                                    <div className='row m-2'>
                                        <div key={product.id}>
                                            <Link style={{pointerEvents: clickable ? '' : 'none'}} to={`/scan/${product.id}`}></Link>
                                        </div>                                
                                    </div>                       
                                </SwiperSlide>
                            );
                        })} */}
                {/* </Swiper>
            </div>             */}