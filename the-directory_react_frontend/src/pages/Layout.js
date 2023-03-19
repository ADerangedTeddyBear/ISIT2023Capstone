import { Outlet, Link } from "react-router-dom";
import Nav from "../components/page_components/Nav";
import logo from '../assets/images/crocLogo.png'


const Layout = () => {
  return (
    <>
    <img src={logo} className="App-logo" alt="logo" />        
    <Nav />
    <Outlet />

    </>
  )
};

export default Layout;