import React, { useState } from 'react';
import MyComponent from './MyComponent';
import Scanner from '../../pages/Scanner';

const App = () => {
  const [scannedResult, setScannedResult] = useState('');

  const handleScan = (result) => {
    setScannedResult(result);
  };

  return (
    <div>
      {scannedResult ? (
        <MyComponent scannedResult={scannedResult} />
      ) : (
        <Scanner onScan={handleScan} />
      )}
    </div>
  );
};

export default App;

