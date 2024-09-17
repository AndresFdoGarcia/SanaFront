import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { openProductDetail } from '../../Features/ProductDetail/productDetailSlice';
import { addToCart } from '../../Features/Cart/cartSlice';
import { PlusCircleIcon } from '@heroicons/react/24/solid';


const Card = ({ data }) => {

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.stopPropagation();
        dispatch(openProductDetail(data));
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        dispatch(addToCart(data));
    };

    return (
        <div className="bg-white cursor-pointer min-w-36 min-h-40 max-w-52 max-h-60 mx-auto pt-6" >
            <figure className="relative mb-2 w-full h-4/5">
            <div className="absolute top-0 left-0 w-1/2 h-full cursor-pointer" onClick={handleClick}></div>
                <span className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.4">
                    {data.categories.map((category, index) => (
                        <span key={index} className="mr-1">
                            {category.categoryName}
                            {index < data.categories.length - 1 && ', '}
                        </span>
                    ))}
                </span>
                <img className="w-full h-full object-cover rounded-lg cursor-default" src={data.image} alt={data.productName}></img>
                <div className="absolute top-0 right-0 flex justify-center items-center rounded-full m-1 p-1 cursor-pointer">
                    <PlusCircleIcon className='h-9 w-9 text-sky-600 hover:text-black bg-white rounded-full m-1' onClick={handleAddToCart}></PlusCircleIcon>
                </div>
            </figure>
            <p className="flex justify-between">
                <span className="text-sm font-light">{data.productName}</span>
                <span className="text-lg font-medium">${data.price}</span>
            </p>
        </div>
    );
};

export default Card