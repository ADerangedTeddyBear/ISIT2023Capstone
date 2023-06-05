//VERSION TWO

import React from 'react';
import QrScanner from 'react-qr-scanner';
// import '../assets/styles/Scanner.css';
// import '../assets/styles/Scanner_style.css';
import { useState, useRef } from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 

import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
    const navigate = useNavigate();

    const qrRef = useRef(null);
    const [webcamResult, setWebCamResult] = useState();

    const handleScan = (data) => {
      if (data) {
        setWebCamResult(data.text);
        const url = new URL(data.text);
        const productId = url.pathname.split('/').pop();
        navigate(`/scan?id=${productId}`);
      }
    };

  const handleError = (error) => {
    console.error(error);
  };


//   const webcamError = (error) => {
//         if (error) {
//             console.log("There was an error");
//         }
//     };

//     const webcamScan = (result) => {
//         if (result){
//             setWebCamResult(result.text);
//             console.log(webcamResult);
//         }

//     };

  return (
    <div>
      <BrowserView>
        <div>This application function is not compatible with non-mobile devices. Please return to the home page</div>
      </BrowserView>
          <MobileView>
                <div className='scanner'>
                <QrScanner
                        style={{ width: '90%', border: '5px solid white', borderRadius: '5px', margin: 'auto', display: 'block' }}

                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    // facingMode={'user'}
                    // legacyMode={true}
                />
                    {/* <QrReader                
                        delay={300} 
                        onError={webcamError}
                        onScan={webcamScan}
                        facingMode={'user'}
                        legacyMode={true}
                    /> */}
                    <p>The result is: {webcamResult}</p>
                    <h5>Result display in list of cards with pagination based on desired design.</h5>

                </div>
            </MobileView>
      {/* <QrScanner
        onScan={webcamScan}
        onError={webcamError}
        style={{ width: '100%' }}
      />
      <p>{webcamResult}</p> */}
    </div>
  );
};

export default QRScanner;



//VERSION ONE
// import React from 'react';
// import '../assets/styles/Scanner.css';
// //import '../assets/styles/Scanner_style.css';
// import QrReader from 'react-qr-scanner'
// // import QrReader from 'react-qr-reader';
// import { useState, useRef } from 'react';
// import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 

// export default function Scanner(){    

//     const qrRef = useRef(null);
//     const [webcamResult, setWebCamResult] = useState();

    

    // const webcamError = (error) => {
    //     if (error) {
    //         console.log("There was an error");
    //     }
    // };

    // const webcamScan = (result) => {
    //     if (result){
    //         setWebCamResult(result);
    //         console.log(webcamResult);
    //     }

    // };

    // const onScaFile = () =>{
    //     qrRef.current.openImageDialog();
    // }




//     return (
//         <div>
//             <h1 className='pageTitle'>Scanner</h1>

//             <MobileView>
//                 <div className='scanner'>
//                 <QrReader
//                 delay={this.state.delay}
//                 style={previewStyle}
//                 onError={this.handleError}
//                 onScan={this.handleScan}
//                     // delay={300}
//                     // onError={webcamError}
//                     // onScan={webcamScan}
//                     // facingMode={'user'}
//                     // legacyMode={true}
//                 />
//                     {/* <QrReader                
//                         delay={300} 
//                         onError={webcamError}
//                         onScan={webcamScan}
//                         facingMode={'user'}
//                         legacyMode={true}
//                     /> */}
//                     <p>The result is: {this.state.result}</p>
//                     <h5>Result display in list of cards with pagination based on desired design.</h5>

//                 </div>
//             </MobileView>

//             <BrowserView>
//                 <div>This application function is not compatible with non-mobile devices. Please return to the home page</div>
//             </BrowserView>


            
//         </div>
//     )
// }