import ReactPaginate from 'react-paginate';
import ScanItem from '../components/page_components/ScanItem';
import { useEffect, useState } from 'react';
import '../assets/styles/Styles.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 

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

//URL Search Parameter
import { Link, useParams, useSearchParams } from 'react-router-dom';

export default function Scan(){
    const [clickable, setClickable] = useState(true);

    // URL Search Parameter
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('query'));
    const [isActive, setIsActive] = useState(true); 



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
    const {productId} = useParams();

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
    
    const handlePageClickNext = async (data) =>{
        // console.log("The Data page limit is: " + pageLimit); PASSED!!!
        //console.log("The Data page limit is: " + products[0].id); PASSED!!!
        //console.log("I AM THE LAST!!!"); //PASSED!!!
        //console.log("The Data page is: " + productPerPage.currentPage); //PASSED!!!

        let currentPage = productPerPage.currentPage + 1;
        const productsFormsServer = await fetchProducts(currentPage);
        setProducts(productsFormsServer);
    }

    const handlePageClickPrev = async (data) =>{
        // console.log("The Data page limit is: " + pageLimit); PASSED!!!
        //console.log("The Data page limit is: " + products[0].id); PASSED!!!
        //console.log("I AM THE LAST!!!"); //PASSED!!!
        //console.log("The Data page is: " + productPerPage.currentPage); //PASSED!!!

        if (productPerPage.currentPage != 1)
        {
            let currentPage = productPerPage.currentPage - 1;
            const productsFormsServer = await fetchProducts(currentPage);
            setProducts(productsFormsServer);

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

    const onSlideChange = (swiper) => {
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

            {/* {console.log(products)} */}
            <div className='swiper-paginate-controls'></div>
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
                    {products.map((product) => {
                        {Object.entries(dictionary).map((dic) => {
                            if (dic[0] == product.id){
                                product.imageAccessNumber = dic[1]
                            }
                        })}
                    })}


                    {products.map((product) => {
                    return (
                        <SwiperSlide>
                            <div className='row m-2'>
                                <div key={product.id}>
                                    <Link style={{pointerEvents: clickable ? '' : 'none'}} to={`/scan/${product.id}`}></Link>
                                    <ScanItem
                                    itemName = {product.productName} 
                                    itemDescription ={product.description} 
                                    itemImageName = {product.imageAccessNumber}
                                    />
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
