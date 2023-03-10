//import React from 'react';
//import logo from './logo.svg';
import logo from './assets/images/crocLogo.png'
import Nav from './components/page_components/Nav';

import './App.css';

function App() {
  return (
    
    <div className='navbar-Container'>

      <nav>
        <div>
          <img src={logo} className="App-logo" alt="logo" />          
        </div>

        <div className="App-nav">
          <Nav />
        </div>
        
      </nav>

      
    
   
    </div>






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