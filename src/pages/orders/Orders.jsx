import { useState, useEffect } from "react"
import { getOrders } from "../../firebase"
import Order from "../../components/order/Order"
import { PropTypes } from "prop-types"
import { useStateValue } from "../../context/StateContext"




const Orders = () => {

  const [{user}] = useStateValue()

  const [orders, setOrders] = useState([])

  useEffect(()=>{
    user && setOrders(getOrders(user?.uid))
  },[user])
  


  return (
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {console.log(orders)}
        {orders?.map((order, i)=>(
          <Order order={order} key={i} />
        ))}
      </div>
    </div>
  )
}

Orders.propTypes = {
  user: PropTypes.any
}

export default Orders