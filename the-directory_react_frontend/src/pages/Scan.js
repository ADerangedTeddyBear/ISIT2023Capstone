import ReactPaginate from 'react-paginate';
import ScanItem from '../components/page_components/ScanItem';
import { useEffect, useState } from 'react';
import '../assets/styles/Styles.css';


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
    const [imageUrls, setImageUrls] = useState({});
    const imagesListRef = ref(storage, "images/");

    // Create a reference to the file whose metadata we want to retrieve

    const [products, setProducts] = useState([]);
    const [pageLimit, setPageLimit] = useState([]);


    useEffect(() => {
        const getProducts = async () => {
            const res = await fetch(
                'https://localhost:7294/api/Pages/1'
            );

            const data = await res.json();

            setProducts(data.products);
            setPageLimit(data.pages);
              
            data.products.forEach((item)=>{
                console.log(item.imageAccessNumber)
            })

        }

        getProducts();
        


        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url => {
                    let updatedValue= {}
                    updatedValue[item.name] = url
                    //console.log(item.name, url)
                    setImageUrls(imageUrls => ({
                        ...imageUrls,
                        url
                    }))
              }));
            });
          });
        

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
        <div className='container'>
            <div className='row m-2'>
                {/* {console.log(Object.keys(Object.values(imageUrls)[0]) + "Key")}
                {console.log(Object.values(Object.values(imageUrls)[0]))} */}
                {console.log(imageUrls)}
                {products.map((product) => {
                    return (
                        <div key={product.id}>
                            <ScanItem itemName = {product.productName} itemDescription ={product.description} itemLink = {product.imageAccessNumber} />
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
