//import React from 'react';
//import logo from './logo.svg';
//import logo from './assets/images/crocLogo.png'
//import Nav from './components/page_components/Nav';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
import Layout from "./pages/Layout";
import Home from './pages/Home';
import Scan from './pages/Scan';
import Scanner from './pages/Scanner';
import ScanItem from "./components/page_components/ScanItem";
import MyComponent from "./components/page_components/MyComponent";
import ResultPage from "./components/page_components/ResultPage";
import DesktopDisclaimer from "./components/page_components/DesktopDisclaimer";
function App() {
  return (
    <>
      {/* Navigation routes for the application */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="scan/" element={<MyComponent />} />
            <Route path="desktopdisclaimer/" element={<DesktopDisclaimer />} />
            <Route path="scan/:productId" element={<MyComponent />} />
            <Route path="scanner" element={<Scanner />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;