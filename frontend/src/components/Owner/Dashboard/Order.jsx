import { useEffect, useState } from "react";

const ORDERSTATUS = {
    cook: 'COOKING',
    done: 'Completed',
  };
  
  const Order = (props) => {
    const {status, payment, total, id, handler} = props;
    const [orderStatus,setStatus] = useState('');

    useEffect(()=> setStatus(status) , [status]);

    const isDone = ORDERSTATUS.done === orderStatus;
    // const isCooking = ORDERSTATUS.cook === props.status.toString().toUpperCase();

    const paymentDate = new Date(payment).toLocaleString();
    async function clickHandler(){
      const res = await handler(ORDERSTATUS.done,id);
      res && setStatus(ORDERSTATUS.done);
    }
    return (
      <div className="order">
        {props.children}
        <div className="order__details">
          <p className="order__text">payment: {paymentDate}</p>
          <p className="order__text">total: {total}</p>
          <p className="order__text">status: {orderStatus}</p>
        </div>
  
        {/* {!isCooking && !isDone && <button onClick={()=>{handler(ORDERSTATUS.cook,id)}} className="button button--white">Cooking</button>} */}
        {!isDone && <button onClick={clickHandler} className="button button--white">completed</button>}
      </div>
    );
  };
  
  export default Order;
  