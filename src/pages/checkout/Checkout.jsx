import './checkout.css'
import Subtotal from '../../components/subtotal/Subtotal'
import { useStateValue } from '../../context/StateContext'
import CheckOutProduct from '../../components/checkoutproduct/CheckOutProduct'
import FlipMove from 'react-flip-move'


const Checkout = () => {
  const [{basket,user}] = useStateValue();
  
  return (
    <div className='checkout'>
        <div className="checkout__left">
            <img 
            src="https://amazon-clone-with-stripe-payment.netlify.app/images/OCC_Amazon1._CB423492668_.jpg" 
            alt="" className="checkout__ad" />
            <div>
              <h3>Hello, {user ? user.email.split('@')[0]: 'Guest'}</h3>
              <h2 className='checkout__title'>Your Shopping Basket</h2>
              <FlipMove>
                {basket?.map((item,i)=>(
                  <CheckOutProduct
                  key={i} 
                  index={i}
                  id={item.id} 
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  />
                ))}
              </FlipMove>
                
            </div>
        </div>
        <div className="checkout__right">
            <Subtotal />
            <h2>The subtotal will go here</h2>
        </div>
    </div>
  )
}

export default Checkout