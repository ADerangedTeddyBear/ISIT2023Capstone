import React from 'react';
import QrScanner from 'react-qr-scanner';
import { useState, useRef } from 'react';
import { BrowserView, MobileView, isMobile } from 'react-device-detect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  document.title = "Scanner"

  const navigate = useNavigate();

  const qrRef = useRef(null);
  const [webcamResult, setWebCamResult] = useState();

  //Handles QR codes that have been scanned by the camera
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

  const videoConstraints = {
    facingMode: { exact: 'environment' }, // Use the back camera
  };

  return (
    <div>
      {/* Failsafe for in case the user somehow accesses Scanner from an unsupported device */}
      <BrowserView>
        <div>This application function is not compatible with non-mobile devices. Please return to the home page</div>
      </BrowserView>

      {/* Mobile view for camera */}
      <MobileView>
        <div className='scanner'>
          <QrScanner
            style={{ width: '90%', border: '5px solid white', borderRadius: '5px', margin: 'auto', display: 'block' }}
            delay={300}
            onError={handleError}
            onScan={handleScan}
            //constraints={{facingMode: 'environment'}}//
            videoConstraints={videoConstraints} // Specify the video constraints
          />
        </div>
      </MobileView>
    </div>
  );
};

export default QRScanner;
