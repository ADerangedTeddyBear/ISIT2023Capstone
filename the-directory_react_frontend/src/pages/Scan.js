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