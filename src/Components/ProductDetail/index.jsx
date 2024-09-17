import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeProductDetail } from '../../Features/ProductDetail/productDetailSlice';
import { XMarkIcon } from '@heroicons/react/24/solid';
import './style.css';

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { isOpen, product } = useSelector((state) => state.productDetail);

    if (!isOpen || !product) return null;

    return (
        <aside 
        className="product-detail flex flex-col fixed right-0 border border-black rounded-lg bg-white">
            <div className="flex justify-between items-center p-6">
                <h2 className="text-xl font-bold">Product Details</h2>
                <XMarkIcon 
                    className="h-5 w-5 text-black cursor-pointer"
                    onClick={() => dispatch(closeProductDetail())}
                />
            </div>
            <figure className=' flex flex-col justify-center px-6 mx-auto'>
                <img className='rounded-lg w-60 h-60' src={product.image} alt={product.productName} />
                <figcaption className='mt-1 text-xs text-gray-500'>Item No: SEC-{product.productId}CAT{product.categories[0].categoryId}</figcaption>
            </figure>
            <p className='flex flex-col p-6'>
                <span className='flex justify-between items-center mb-2'>
                    <span className='font-medium text-2xl'>
                        ${product.price}
                    </span>
                    <span className='stock-qty'> {product.stockQty} in stock</span>
                </span>
                <span className='font-medium text-md text-2xl  mb-4'>{product.productName}</span>
                <span className='font-medium text-md text-gray-500'>{product.descript}</span>               
            </p>            
        </aside>
    );
};

export default ProductDetail;