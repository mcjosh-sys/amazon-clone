import './product.css'
import { useStateValue } from '../../context/StateContext'
import PropTypes from 'prop-types'



const Product = ({id, title, image, price, rating}) => {
  const [, dispatch] = useStateValue()

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating
      }
    })
  }

  return (
    <div className='product'>
        <div className="product__info">
            <p>{title}</p>
            <p className="product__price">
                <small>$</small>
                <strong>{price}</strong>
            </p>
            <div className="product__rating">
                {Array(rating).fill().map((_,i) =><p key={i}>⭐</p>)}
            </div>
        </div>
        <img src={image} alt="" />
        <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired
}

export default Product