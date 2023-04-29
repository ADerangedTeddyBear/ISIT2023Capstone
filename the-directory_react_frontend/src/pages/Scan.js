import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import '../assets/styles/Styles.css';


export default function Scan(){

    const [products, setProducts] = useState([]);
    const [pageLimit, setPageLimit] = useState([]);

    useEffect(() => {
        
        const getProducts = async () => {
            const res = await fetch(
                'https://localhost:7294/api/Product/1'
            );

            const data = await res.json();

            setProducts(data.products);
            setPageLimit(data.pages);
            console.log("The limit is " + data.pages);           
        }

        getProducts();


    }, []);


    const fetchProducts = async (currentPage) => {

        const requestURL = "https://localhost:7294/api/Product/" + currentPage;
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

                {products.map((product) => {
                    return (
                        <div key={product.id} className="col-sm-6 col-md-4 v my-2" >
                            <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
                                <div className="card-body">
                                    <h5 className="card-title text-center h2">Product Name: {product.productName}</h5>
                                    <h5 className="card-title text-center h2">Price: {product.imgSrc}</h5>
                                    <p className="card-text">Description: {product.description}</p>
                                </div>
                            </div>
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
*/