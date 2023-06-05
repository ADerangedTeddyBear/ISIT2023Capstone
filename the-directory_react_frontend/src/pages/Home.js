import React, { useState, useEffect } from 'react';
import axios from "axios";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";
import '../assets/styles/List.css';

export default function Home() {
  const [dictionary, setDictionary] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const imagesListRef = ref(storage, "images/");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://mongodbbackend.azurewebsites.net//api/Product')
      .then(response => setData(response.data))
      .catch(error => console.log(error));

    const getAllProducts = async () => {
      const res = await fetch('https://mongodbbackend.azurewebsites.net//api/Product');
      const data = await res.json();
      setAllProducts(data);

      listAll(imagesListRef).then(response => {
        const downloadPromises = response.items.map(item => {
          return getDownloadURL(item).then(url => {
            return { name: item.name, url };
          });
        });

        Promise.all(downloadPromises).then(downloads => {
          const imageDictionary = {};

          data.forEach(product => {
            downloads.forEach(download => {
              if (product.imageAccessNumber === download.name) {
                imageDictionary[product.id] = download.url;
              }
            });
          });

          setDictionary(imageDictionary);
        });
      });
    }
    getAllProducts();
  }, []);

  return (
    <div className="list-container">
      {allProducts.map(product => {
        console.log(product)
        const imageUrl = dictionary[product.id];
        return (
          <div key={product.id} className="list-item" >  
            <a href={'http://localhost:3000/scan/' + product.sequences}>

              <div className='image-container'>
                <img  className='item-image'
                  src={imageUrl}
                  alt={product.productName}                
                  // style={{ width: '100px', height: '100px' }}
                />
              </div>
              <div className='.item-text'>
                {product.productName}
              </div>

            </a>
          </div>
        );
      })}
    </div>
  );
}
