import React, { useState } from "react";
import '../App.css';
import { IonIcon } from '@ionic/react';
import '@ionic/react/css/core.css';
import logoImg from '../assets/imgs/blog-web-transparent.png';
import { NavLink,useNavigate } from 'react-router-dom'; 
import { menuOutline, closeOutline } from 'ionicons/icons';
import { useAuthContext } from "../context/AuthContext";

function NavBar() {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, loginStatus, setLoginStatus } = useAuthContext();
    const [menuName, setMenuName] = useState('menu');
    const [navLinksClass, setNavLinksClass] = useState('top-[-100%]');

    function onToggleMenu() {
        setMenuName(prevMenuName => prevMenuName === 'menu' ? 'close' : 'menu');
        setNavLinksClass(prevNavLinksClass => prevNavLinksClass === 'top-[-100%]' ? 'top-[9%]' : 'top-[-100%]');
    }

    function closeMenu() {
        setMenuName('menu');
        setNavLinksClass('top-[-100%]');
    }

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        setLoginStatus('Login');
        navigate('/login'); // Navigate to the login page
    };

    return (
        <div className="bg-slate-900 text-gray-300">
            <nav className="flex justify-between items-center w-[92%] mx-auto h-16">
                <div>
                    <NavLink to="/"> 
                        <img className="w-20 h-9 cursor-pointer" src={logoImg} alt="logo" />
                    </NavLink>
                </div>
                <div className={`nav-links duration-500 md:static absolute bg-slate-900 md:min-h-fit min-h-[80vh] left-0 ${navLinksClass} md:w-auto w-full flex items-center px-5`} style={{ zIndex: 50 }}>
                    <ul className="text-lg flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                        <li>
                            <NavLink className="hover:text-gray-500" to="/" onClick={closeMenu}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink className="hover:text-gray-500" to="/blogcreate" onClick={closeMenu}>Create Blog</NavLink>
                        </li>
                        <li>
                            <NavLink className="hover:text-gray-500" to="/blog" onClick={closeMenu}>Blog View</NavLink>
                        </li>
                        <li>
                            <NavLink className="hover:text-gray-500" to="/profile" onClick={closeMenu}>Profile</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center gap-6">
                    {isLoggedIn ? (
                        <button onClick={handleLogout} className="bg-[#6693e2] text-white px-3 py-1 rounded-full hover:bg-[#7587a5]">{loginStatus}</button>
                    ) : (
                        <NavLink to="/login">
                            <button className="bg-[#6693e2] text-white px-3 py-1 rounded-full hover:bg-[#7587a5]">{loginStatus}</button>
                        </NavLink>
                    )}
                    <IonIcon 
                        icon={menuName === 'menu' ? menuOutline : closeOutline} 
                        className="text-3xl cursor-pointer md:hidden" 
                        color="white" 
                        onClick={onToggleMenu}
                    />
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
