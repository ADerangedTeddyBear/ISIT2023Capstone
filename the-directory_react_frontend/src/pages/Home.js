import React from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import {
  ref,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { storage } from "../firebase";

export default function Home(){
    const [dictionary, setDictionary] = useState({});
    const [allProducts, setAllProducts] = useState([]);
    const imagesListRef = ref(storage, "images/");
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
            setAllProducts(data);

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
        }, []);
    return (
        <div>
                {console.log(allProducts)}
                {allProducts.map((product) => {
                    {Object.entries(dictionary).map((dic) => {
                        if (dic[0] == product.id){
                            product.imageAccessNumber = dic[1]
                        }
                    })}
                    return (
                        <div key={product.id}>
                            <a href={'http://localhost:3000/scan/' + product.id}>
                                <h1>{product.productName}</h1>
                                <img
                                    className='itemImage'
                                    src = {product.imageAccessNumber}                                
                                />
                            </a>
                        </div>
                    );
                })}
        </div>
    )
}