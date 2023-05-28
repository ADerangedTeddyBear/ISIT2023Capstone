import React, { useState, useEffect } from 'react';
import axios from "axios";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../firebase";

export default function Home() {
  const [dictionary, setDictionary] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const imagesListRef = ref(storage, "images/");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:7294/api/Product')
      .then(response => setData(response.data))
      .catch(error => console.log(error));

    const getAllProducts = async () => {
      const res = await fetch('https://localhost:7294/api/Product');
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
    <div>
      {allProducts.map(product => {
        console.log(product)
        const imageUrl = dictionary[product.id];
        return (
          <div key={product.id}>
            <a href={'http://localhost:3000/scan/' + product.sequences}>
              <h1>{product.productName}</h1>
              <img
                className='itemImage'
                src={imageUrl}
                alt={product.productName}
                style={{ width: '200px', height: '200px' }}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
}
