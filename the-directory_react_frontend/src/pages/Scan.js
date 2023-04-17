<<<<<<< HEAD
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import '../assets/styles/Styles.css';

export default function Scan(){
    const [testStuff, setTestStuff] = useState([]);


    useEffect ( () => {
        const testStuff = async () => {
            const res = await fetch(
              `http://localhost:1625/api/product`
            );
            const data = await res.json();
            //const total = res.headers.get('x-total-count');
            //setpageCount(Math.ceil(total/limit));
            //console.log(Math.ceil(total/12));
            setTestStuff(data);
          };
      
          testStuff();
      
        }, []);

        /*
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

        }, [])*/

    return (
        <div className="container">
        <div className="row m-2">
     

        {testStuff.map((item) => {
        return <div key={item.product_id} className="col-sm-6 col-md-4 v my-2" >
            <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
            <div className="card-body">
                <h5 className="card-title text-center h2">Product Name: {item.product_name}</h5>
                <h5 className="card-title text-center h2">Price: {item.price}</h5>
                <p className="card-text">Description: {item.discription}</p>
                <h6 className="card-subtitle mb-2 text-muted text-center">Link: {item.link_Url}</h6>

            </div>
            </div>
            </div>;
        })}

        <ReactPaginate 
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={10}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            //onPageChange={handlePageClick}
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
    );
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
=======
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import '../assets/styles/Styles.css';

export default function Scan(){
    const [testStuff, setTestStuff] = useState([]);


    useEffect ( () => {
        const testStuff = async () => {
            const res = await fetch(
              `http://localhost:1625/api/product`
            );
            const data = await res.json();
            //const total = res.headers.get('x-total-count');
            //setpageCount(Math.ceil(total/limit));
            //console.log(Math.ceil(total/12));
            setTestStuff(data);
          };
      
          testStuff();
      
        }, []);

        /*
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

        }, [])*/

    return (
        <div className="container">
        <div className="row m-2">
     

        {testStuff.map((item) => {
        return <div key={item.product_id} className="col-sm-6 col-md-4 v my-2" >
            <div className="card shadow-sm w-100" style={{ minHeight: 225 }}>
            <div className="card-body">
                <h5 className="card-title text-center h2">Product Name: {item.product_name}</h5>
                <h5 className="card-title text-center h2">Price: {item.price}</h5>
                <p className="card-text">Description: {item.discription}</p>
                <h6 className="card-subtitle mb-2 text-muted text-center">Link: {item.link_Url}</h6>

            </div>
            </div>
            </div>;
        })}

        <ReactPaginate 
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={10}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            //onPageChange={handlePageClick}
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
    );
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
>>>>>>> bb8c6e8c53274876653dba9d74138c94541e9f22
*/