/* eslint-disable react/display-name */
import {forwardRef} from 'react'
import './checkoutProduct.css'
import { useStateValue } from '../../context/StateContext'
import PropTypes from 'prop-types'

const CheckOutProduct = forwardRef(({index, image, title, price, rating}, ref) => {
    const [,dispatch] = useStateValue()

    const removeFromBasket = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            index: index
        })
    }
  return (
    <div className='checkoutProduct' ref={ref}>
        <img src={image} alt="" className="checkoutProduct__image" />
        <div className="checkoutProduct__info">
            <p className="checkoutProduct__title">{title}</p>
            <p className="checkoutProduct__price">
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className="checkoutProduct__rating">
                {Array(rating).fill().map((_,i)=>(
                    <p key={i}>⭐</p>
                ))}
            </div>
            <button onClick={removeFromBasket}>Remove from  Basket</button>
        </div>
    </div>
  )
})

CheckOutProduct.propTypes = {
    index: PropTypes.number,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired
  }

export default CheckOutProduct