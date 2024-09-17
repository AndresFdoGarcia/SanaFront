import { NavLink,useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "../../Features/Products/productsSlice";
import { fetchOrders } from "../../Features/Orders/orderSlice";
import './style.css';
import { selectTotalQuantity } from "../../Features/Cart/cartSlice";
import { signIn,signOut,selectUser } from "../../Features/User/userSlice";


const Navbar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const totalQuantity = useSelector(selectTotalQuantity);
    const [showAnimation, setShowAnimation] = useState(false);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (totalQuantity > 0) {
            setShowAnimation(true);
            const timer = setTimeout(() => setShowAnimation(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [totalQuantity]);

    const handleMenuClick = (value) => {
        setSelectedCategory(value);
        dispatch(fetchProducts(value));
    };

    const handleSignIn = () => {
        const userData = {
          custid: 1,
          firstname: 'John',
          lastname: 'Doe',
          loginname: 'johndoe',
        };        
        dispatch(signIn(userData));
    };

    const handleLogOut = () => {        
        dispatch(signOut());
    }

    const handleFetchOrders = () => {
        dispatch(fetchOrders());
    }

    const handleHOme = () => {
        handleMenuClick(null)
        navigate('/');
    }

    let menu1 = [        
        {
            to: '/',
            text: 'All',
            className: ''
        },
        {
            to: '/',
            text: 'Accessories',
            className: '',
            value: 4
        },
        {
            to: '/',
            text: 'Game Consoles',
            className: '',
            value: 3
        },
        {
            to: '/',
            text: 'Laptops',
            className: '',
            value: 1
        },
        {
            to: '/',
            text: 'Smartphones',
            className: '',
            value: 2
        },
        {
            to: '/',
            text: 'Software Licenses',
            className: '',
            value: 5
        },
    ]
    
    let menu2 = [
        {
            to: '/',
            text: `Login as ${user?.firstname ?? null} ${user?.lastname ?? null}`,
            className: 'text-black/60',
            visible: user ? true : false
        },
        {
            to: '/myorders',
            text: 'My orders',
            className: '',
            visible: user ? true : false,
            handleFetchOrders         
        },
        {
            to: '/',
            text: 'Sign in',
            className: '',
            visible: user ? false : true,
            onClick: handleSignIn
        },
        {
            to: '/',
            text: 'Log out',
            className: '',
            visible: user ? true : false,
            onClick: handleLogOut
        },
        {
            to: '/cart',
            text: (
                <>
                    🛒
                    <span className={`ml-1 ${showAnimation ? 'bg-red-500 text-white rounded-full px-2' : ''}`} style={{ minWidth: '35px', display: 'inline-block', textAlign: 'center' }}>
                        {totalQuantity > 0 ? totalQuantity : ''}
                    </span>
                </>
            ),
            className: '',
            visible: true
        },
    ]

      

  return (
    <>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap');
    </style>   
    <nav className="navbar flex items-center fixed justify-between z-10 top-0 w-full py-4 px-8 text-sm bg-white">
    <span className='font-semibold text-3xl shadows-into-light-regular text-red-500'
        onClick={handleHOme} style={{ cursor: 'pointer' }}>SANA E-Shopi</span>
        <ul className='flex gap-3 items-center'>
            {menu1.map(link => (
                <li 
                    key={link.text}
                    className={`${link.className} ${selectedCategory === link.value ? 'selected-category' : ''}`}
                >
                    <NavLink 
                        to={link.to}
                        onClick={() => handleMenuClick(link.value)}                        
                    >
                        {link.text}
                    </NavLink>
                </li>
            ))}
        </ul>
        <ul className='flex gap-3 items-center'>
            {menu2.map(link => (
                link.visible === true ? (
                    <li 
                    key={link.text}
                    className={link.className}
                >
                    <NavLink 
                        to={link.to}
                        onClick={link.onClick ? link.onClick : null}                      
                    >
                        {link.text}
                    </NavLink>
                </li>
                ) : null                
            ))}
        </ul>
    </nav>
    </>
  );
}

export default Navbar