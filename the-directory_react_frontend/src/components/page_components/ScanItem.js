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


export default function ScanItem(props){
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
        }


        getAllProducts()
        getProducts();
        }, []);
        const filteredData = Array.isArray(data) ? data.filter(item => item.id === productId) : console.log("NA");

    return (
        <div>
            {/* Browser */}
            <BrowserView>
                <div className="DesktopScanItem">
                    <div className="w3-card-4 w3-border DesktopScanItem">
                        <header className="w3-container w3-white">
                            <h1 className='DesktopItemName'>{props.itemName}</h1>
                        </header>

                        <div className="w3-container DesktopScanItemDescription">
                            {props.itemDescription}
                        </div>
                        <br></br>
                        <div className="w3-container">
                            imageName: {props.itemImageName}
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
            ))}



</MobileView>
           
        </div>
    )
}
