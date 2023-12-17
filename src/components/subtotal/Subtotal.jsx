import './subtotal.css'
import CurrencyFormat from 'react-currency-format'
import { useStateValue } from '../../context/StateContext';
import { getBasketTotal } from '../../reducers/reducer';
import { useNavigate } from 'react-router-dom';

const Subtotal = () => {
    const [{basket, user}, dispatch] = useStateValue()
    const navigate = useNavigate()
    //const location = useLocation()

    const hanpdlecClick = () => {
        if (user===null) {
            dispatch({
                type: 'REDIRECT',
                location: '/payment'
            })
            navigate('/signin')
        }   
        else navigate('/payment')
    }

  return (
    <div className='subtotal'>
        <CurrencyFormat 
        renderText={(value) => (
            <>
                <p>Subtotal ({basket.length} items):
                <strong>{value}</strong>
                </p>
                <small className="subtotal__gift">
                    <input type="checkbox" /> This order contains a gift 
                </small>
            </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType='text'
        thousandSeparator = {true}
        prefix='$'
        />
        <button onClick={hanpdlecClick}>Proceed to checkout</button>
    </div>
  )
}

export default Subtotal