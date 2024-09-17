import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders } from '../../Features/Orders/orderSlice';
import {CheckBadgeIcon, TruckIcon} from '@heroicons/react/24/solid';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const status = useSelector((state) => state.orders.status);
  const error = useSelector((state) => state.orders.error);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem('user'));
  const firstName = user ? user.firstname : '';
  const lastName = user ? user.lastname : '';

  const calculateDaysDifference = (orderDate) => {
    const currentDate = new Date();
    const orderDateObj = new Date(orderDate);
    const timeDifference = currentDate - orderDateObj;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference;
  };

  return (
    <div>
      <h1>Órdenes de {firstName} {lastName}</h1>
      {status === 'loading' && <p>Cargando órdenes...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && Array.isArray(orders) &&  (
        <table className='mt-8 min-w-full bg-white table-fixed'>
          <thead>
            <tr>
              <th className=''>Order ID</th>
              <th className=''>Date order</th>
              <th className=''>Amount</th>
              <th className=''>Shipped</th>
            </tr>
          </thead>
          <tbody className=''>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td className='text-center'>{order.orderId}</td>
                <td className='text-center'>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className='text-center'>${order.totalAmount}</td>
                <td className='text-center'>
                {calculateDaysDifference(order.orderDate) > 10 ? (
                <div className='flex justify-center'>
                    <CheckBadgeIcon className='h-9 w-9 text-green-500' />
                </div>
                ) : (
                <div className='flex justify-center'>
                    <TruckIcon className='h-9 w-9 text-cyan-500' />
                </div>
                )}
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;