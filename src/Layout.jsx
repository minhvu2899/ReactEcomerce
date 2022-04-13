// import Header1 from 'components/Header1';
import { useSelector } from 'react-redux';
import './App.css';
import Footer from './components/Footer/index';
import Header from './components/Header/index';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Layout({ children }) {
    const location = useLocation()
    useEffect(() => {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        })
    }, [location])
    return (
        <>
            <div className="App">
                <Header></Header>
                <div className="main" style={{ minHeight: '800px' }}>
                    <Outlet />
                </div>
                {/* <ChatBox userInfo={current} /> */}
                <Footer></Footer>
                <ToastContainer />
            </div>
        </>
    );
}

export default Layout;
