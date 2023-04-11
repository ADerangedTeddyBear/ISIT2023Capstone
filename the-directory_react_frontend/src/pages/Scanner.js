import React from 'react';
import '../assets/styles/Scanner.css';
//import '../assets/styles/Scanner_style.css';
//import QrReader from 'react-qr-scanner';
import QrReader from 'react-qr-reader';
import { useState, useRef } from 'react';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 

export default function Scanner(){    

    const qrRef = useRef(null);
    const [webcamResult, setWebCamResult] = useState();

    const webcamError = (error) => {
        if (error) {
            console.log(error);
        }
    };

    const webcamScan = (result) => {
        if (result){
            setWebCamResult(result);
        }

    };
    return (
        <div>
            <h1>Scanner</h1>

            <MobileView>
                <div className='scanner'>
                    <QrReader                
                        delay={300} 
                        onError={webcamError}
                        onScan={webcamScan}
                        facingMode={'user'}
                        //legacyMode={true}
                    />

                    <h5>Result display in list of cards with pagination based on desired design.</h5>

                </div>
            </MobileView>

            <BrowserView>
                <div>This application function is not compatible with non-mobile devices. Please return to the home page</div>
            </BrowserView>


            
        </div>
    )
}