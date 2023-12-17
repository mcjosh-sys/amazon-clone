import './order.css'
import { PropTypes } from 'prop-types'

const Order = ({order}) => {
    console.log(order)
  return (
    <div className='or'>Order</div>
  )
}


Order.propTypes = {
    order: PropTypes.any
}

export default Order