import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../Features/Products/productsSlice';
import Card from '../../Components/Card';
import ProductDetail from '../../Components/ProductDetail';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';


const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items || []);
    const productStatus = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; 
    const totalPages = Array.isArray(products) ? Math.ceil(products.length / itemsPerPage) : 0;

    useEffect(() => {
        if (productStatus === 'idle') {
            dispatch(fetchProducts());
        }
    }, [productStatus, dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [products]);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = Array.isArray(products) ? products.slice(startIndex, startIndex + itemsPerPage) : [];

    let content;

    if (productStatus === 'loading') {
        content = <div>Loading...</div>;
    } else if (productStatus === 'succeeded') {
        content = currentProducts.map((product) => (
            <Card 
                key={product.productId} 
                data={product}                 
            />
        ));
    } else if (productStatus === 'failed') {
        content = <div>{error}</div>;
    }

    return (
        <>
            <div className="grid gap-x-8 gap-y-5 grid-cols-3 w-full max-w-screen-lg bg-white mx-auto text-center mt-3 mb-3">
                {content}
            </div>
            <div className="flex justify-center mt-4 mb-4">                
                <ChevronLeftIcon className='h-7 w-7 cursor-pointer' onClick={handlePrevPage} disabled={currentPage === 1}>
                    Prev
                </ChevronLeftIcon>
                <span className='mr-3 ml-3'>
                    Page {currentPage} of {totalPages}
                </span>
                <ChevronRightIcon className='h-7 w-7 cursor-pointer' onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </ChevronRightIcon>
            </div>
            <ProductDetail />         
        </>
    );
};

export default Home;

