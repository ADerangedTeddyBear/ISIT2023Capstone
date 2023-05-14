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
import OneItem from "./components/page_components/OneItem";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="scan" element={<Scan />} />
          <Route path="scan/:productId" element={<OneItem />} />
          <Route path="scanner" element={<Scanner />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;


//<img src={logo} className="App-logo" alt="logo" />

//<Nav />


/*Boiler plate code
   <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      */


      