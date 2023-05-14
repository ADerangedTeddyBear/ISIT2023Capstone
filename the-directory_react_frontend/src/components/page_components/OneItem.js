import React from 'react';
import '../../assets/styles/Nav.css';
import '../../assets/styles/W3.css';
import '../../assets/styles/ScanItem.css';

import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import { useState, useEffect } from "react";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../../firebase";
import { Link, useParams, useSearchParams } from 'react-router-dom';
import axios from "axios";

export default function OneItem(props){
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

        const filteredData = Array.isArray(data) ? data.filter(item => item.id === productId) : console.log("sd");

    return (
        <div>
            <MobileView>
            {filteredData.map((product) => {
                        {Object.entries(dictionary).map((dic) => {
                            if (dic[0] == product.id){
                                product.imageAccessNumber = dic[1]
                            }
                        })}
                    })}

            {filteredData.map(item => (
                            <div key={item.id}>
                            <h2>{item.productName}</h2>
                            <img
                                className='itemImage'
                                src= {item.imageAccessNumber}
                                />
                            <p>{item.description}</p>

                            </div>
                        ))}
            

            </MobileView>
        </div>
    )
}