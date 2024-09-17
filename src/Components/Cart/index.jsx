import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { removeFromCart, updateQuantity, selectCartItems,createOrder, clearCart } from '../../Features/Cart/cartSlice';
import './style.css';


const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const [quantityToAdd, setQuantityToAdd] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setIsAuthenticated(!!user);
    }, []);

    useEffect(() => {        
        const initialQuantities = {};
        cartItems.forEach(item => {
            initialQuantities[item.productId] = 1;
        });
        setQuantityToAdd(initialQuantities);
    }, [cartItems]);

    const handleRemove = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleQuantityChange = (productId, quantity) => {
        dispatch(updateQuantity({ productId, quantity }));
    };

    const handleInputChange = (productId, value) => {
        setQuantityToAdd({
            ...quantityToAdd,
            [productId]: value,
        });
    };

    const handleIncrease = (productId) => {
        const existingProduct = cartItems.find(item => item.productId === productId);
        if (existingProduct) {
            const quantity = quantityToAdd[productId] || 1;
            handleQuantityChange(productId, existingProduct.quantity + quantity);
        }
    };

    const handleDecrease = (productId) => {
        const existingProduct = cartItems.find(item => item.productId === productId);
        if (existingProduct) {
            const quantity = quantityToAdd[productId] || 1;
            const newQuantity = existingProduct.quantity - quantity;
            handleQuantityChange(productId, newQuantity > 0 ? newQuantity : 1);
        }
    };

    const handlePurchase = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Por favor, inicie sesión para realizar una compra.');
            return;
        }

        const order = {
            customerId: user.custid,
            totalAmount: calculateTotal(),
            orderDetails: cartItems.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        };

        dispatch(createOrder(order)).then(() => {
            dispatch(clearCart());
            navigate('/');
    });
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Marcellus&display=swap');
        </style>
        <h1 className='mt-3 ml-8 text-2xl marcellus-regular'>My Shoppin cart</h1>
        <div className='flex'>      
            <div className='flex w-3/5 ml-10'>
                <div className="card1 cart mt-6 mb-6 px-8">            
                    {cartItems.length === 0 ? (
                    <p className='mt-4 ml-8'>Your cart is empty</p>
                    ) : (
                
                    <table className="min-w-full table-auto">
                        <thead>
                        <tr>
                            <th className="py-2 align-middle"></th>
                            <th className="py-2 align-middle">Product Name</th>
                            <th className="py-2 align-middle">Unit Price</th>
                            <th className="py-2 align-middle">Qty</th>                            
                            <th className="py-2 align-middle">Actions</th>
                            <th className="py-2 align-middle">Total</th>
                        </tr>
                        </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.productId} className="text-center">
                                <td className="py-2">
                                    <img src={item.image} alt={item.productName} className="w-16 h-16 object-cover rounded mx-1" />
                                </td>
                                <td className="py-2 align-middle">{item.productName}</td>
                                <td className="py-2 align-middle">${item.price}</td>
                                <td className="py-2 align-middle">{item.quantity}</td>                                
                                <td className="py-2 align-middle flex justify-center items-center">
                                    <div className='align-middle mt-3.5' >
                                    <button onClick={() => handleDecrease(item.productId)} className="text-black">-</button>
                                    <input
                                        type="number"
                                        value={quantityToAdd[item.productId] || item.quantity}
                                        onChange={(e) => handleInputChange(item.productId, Number(e.target.value))}
                                        min="1"
                                        className="w-10 text-center mx-1"
                                    />
                                    <a onClick={() => handleIncrease(item.productId)} className="text-black cursor-pointer ml-2 mr-2">+</a>
                                    <button onClick={() => handleRemove(item.productId)} className="bg-red-500 text-white px-2 py-1 rounded mx-1">Remove</button>
                                    </div>
                                </td>
                                <td className="py-2">${(item.price * item.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3" className="py-2 font-bold text-right align-middle">Total Cart:</td>
                            <td className="py-2 font-bold align-middle">${calculateTotal().toFixed(2)}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
        </div>
        <div className="flex flex-col mt-4 w-1/3 mx-5 mr-10">
            <div className='card1 mt-4 mb-4 mx-4'>
                <div className="mb-4 py-2 ml-2">Total items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</div>
                <div className="mb-4 py-2 ml-2">Total price: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</div>
            </div>
            {isAuthenticated && (
                <button onClick={handlePurchase} 
                className={`bg-blue-500 text-white mx-4 py-2 rounded w-full ${cartItems.length === 0 ? 'button-disabled' : ''}`}
                disabled={cartItems.length === 0}
                >Purchase</button>
            )}
            </div>
            
        </div>
    </>       
    );
};

export default Cart;