import ReactPaginate from 'react-paginate';
import ScanItem from '../components/page_components/ScanItem';
import { useEffect, useState } from 'react';
import '../assets/styles/Styles.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 


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


    const handlePageClick = async (data) =>{

        let currentPage = data.selected + 1;

        const productsFormsServer = await fetchProducts(currentPage);

        setProducts(productsFormsServer);
    }


    return (
        <div>

        <BrowserView>
        <div className='container'>
            <div className='row m-2'>
                {/* {console.log(dictionary)} */}
                {/* {console.log(typeof(Object.keys(dictionary)))} */}
                {/* {console.log(Object.values(dictionary))} */}
                {products.map((product) => {
                    {Object.entries(dictionary).map((dic) => {
                        if (dic[0] == product.id){
                            product.imageAccessNumber = dic[1]
                            //console.log(dic[0], product.id, dic[1])
                        }
                    })}
                    return (
                        <div key={product.id}>
                            <ScanItem itemName = {product.productName} itemDescription ={product.description} itemImageName = {product.imageAccessNumber}/>
                        </div>
                    );
                })}
            </div>
        </div>

        <div>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={pageLimit}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                 nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>      
        </BrowserView>
        <MobileView>
            {/* ReactPaginate Pending Removal */}
        <div>
            <ReactPaginate 
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={pageLimit}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={'pagination justify-content-center'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                 nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>    
        <div className='container'>
            <div className='row m-2'>

                {products.map((product) => {
                    return (
                        <div key={product.id}>
                            <ScanItem itemName = {product.productName} itemDescription ={product.description} itemLink = {product.imageName} />


                          
                        </div>
                    );
                })}

                

            </div>             
        </div>   
        </MobileView>




        </div>
    )
}

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
