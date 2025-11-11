import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
           
            <header>
                <Navbar/>
            </header>
            <main className='container mx-auto'>
                <Outlet/>
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
};

export default MainLayout;