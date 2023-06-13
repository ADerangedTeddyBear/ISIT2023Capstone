import { Outlet, Link } from "react-router-dom";
import Nav from "../components/page_components/Nav";
import logo from '../assets/images/crocLogo.png';
import '../assets/styles/W3.css';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'; 
import 'reactjs-popup/dist/index.css';
import Popup from "reactjs-popup";


const Layout = () => {
  return (
    <>
      <BrowserView>
        <h1 className="Desktop-Title-Label">The Directory</h1>
        <Nav />
        <Outlet />
      </BrowserView>

      <MobileView>
        <h1 className="Title-label PageTitleMobile">The Directory</h1>
        <Nav />
        <Outlet />
      </MobileView>
    </>
  )
};

export default Layout;