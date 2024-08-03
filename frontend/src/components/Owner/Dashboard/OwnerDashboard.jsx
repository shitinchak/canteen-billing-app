import { useLoaderData } from 'react-router-dom';
import findBestDish from './find-best-dish';
import DashboardCard from './DashboardCard';
import dollarCoin from '../../../assets/SVG/dollar-coin.svg';
import cart from '../../../assets/SVG/Cart.svg';
import fork from '../../../assets/SVG/Fork.svg';
import Order from './Order';
import OrderCard from './OrderCard';
import Loading from '../../Loading/Loading';

const OwnerDashboard = () => {

  const data = useLoaderData();

  const statusChangeHandler = async (status,id) => {
    const data = {orderStatus:status};
    try{
      const response = await fetch('/api/v1/owner/orders/'+id,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      if(!response.ok){
        throw new Error('could not change status')
      }

      const resData = await response.json();
      return resData.sucess;

    }catch(err){
      window.alert(err.message);
    }
  }

  const amount = data && data.totalAmount;
  const totalOrders = data && data.totalOrders;
  const orders = data && data.orders;
  const bestDish = data && findBestDish(orders);

  return (
    <section className="owner-dashboard">
      <h1 className="heading-primary owner-dashboard__title">dashboard</h1>
     {data ? <> 
     <div className="card-holder">
        <DashboardCard title="total revenue" content={amount}>
          <img src={dollarCoin} alt='currency symbol' />
        </DashboardCard>
        <DashboardCard title="total orders" content={totalOrders}>
          <img src={cart} alt='cart' />
        </DashboardCard>
        <DashboardCard title="best sellers" content={bestDish}>
          <img src={fork} alt='best sellers' />
        </DashboardCard>
      </div>

      <div>
        <h1 className="heading-primary owner-dashboard__title">orders</h1>
        <ul>
          <li>
            {totalOrders === 0 ? <p>you have no orders</p>
            :orders.map((order) => {
              const orderStatus = order.orderStatus;
              const paymentStatus = order.paidAt;
              const totalPrice = order.totalPrice;
              const orderId = order._id;
              return (
                <Order
                  status={orderStatus}
                  payment={paymentStatus}
                  total={totalPrice}
                  key={orderId}
                  id={orderId}
                  handler={statusChangeHandler}
                >
                  {order.orderItems.map((item) => {
                    return <OrderCard key={item._id} title={item.name} quantity={item.quantity} price={item.price}/>;
                  })}
                </Order>
              );
            })
          }
          </li>
        </ul>
      </div>
      </>: <Loading />
}
    </section>
  );
};

export default OwnerDashboard;
