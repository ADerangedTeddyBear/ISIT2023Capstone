import { Outlet, Link } from "react-router-dom";
import Nav from "../components/page_components/Nav";
import logo from '../assets/images/crocLogo.png';
import '../assets/styles/W3.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 


const Layout = () => {
  return (
    <>
    <BrowserView>
      {/* <img src={logo} className="App-logo" alt="logo" />         */}
      <h1>The Directory</h1>

      <Nav />
      <Outlet />
    </BrowserView>

    <MobileView>
      <h1 className="Title-label PageTitleMobile">The Directory</h1>
      {/* <img src={logo} className="App-logo-alt" alt="logo" /> */}
      <br></br>
      <Outlet />
      <br></br>
      <Nav />
    </MobileView>



    </>
  )
};

export default Layout;