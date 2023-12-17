import './payment.css'
import {useStateValue} from '../../context/StateContext'
import CheckOutProduct from '../../components/checkoutproduct/CheckOutProduct'
import {Link, useNavigate} from 'react-router-dom'
import { useElements, useStripe, CardElement } from '@stripe/react-stripe-js'
import { useState } from 'react'
import { getBasketTotal } from '../../reducers/reducer'
import CurrencyFormat from 'react-currency-format'
import { useEffect } from 'react'
import axios from '../../axios'
import { addOrder } from '../../firebase'
import { PropTypes } from 'prop-types'

const Payment = ({user}) => {

    const [{basket}, dispatch] = useStateValue();
    const navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState(false)

    const [error, setError] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState(true)
    

    const handleChange = (e) => {

        setDisabled(e.empty)
        setError(e.error ? e.error.message : "")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true)
        await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then((paymentIntent) => {
           
            paymentIntent = paymentIntent.paymentIntent
            console.log(paymentIntent.id)
            addOrder(user?.uid, paymentIntent.id, {
                basket: basket,
                amount: paymentIntent.amount,
                createdAt: paymentIntent.created
            })
            setSucceeded(true)
            setError(null)
            setProcessing(false)
            dispatch({
                type: 'EMPTY_BASKET'
            })
            navigate('/orders', {replace: true})
        })
    }

    useEffect(() => {
        const getClientSecret = async () => {
            const res = await axios.post(`/payments/create?total=${getBasketTotal(basket)*100}`)
            setClientSecret(res.data.clientSecret)
        }
        getClientSecret()
    }, [basket]);

  return (
    <div className='payment'>
        <div className="payment__container">
            <h1>
                Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
            </h1>
            {/* Payment section - Delivery Address */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment__address">
                    <p>{user?.email}</p>
                    <p>123 Some some Lane</p>
                    <p>Some City, SM</p>
                </div>
            </div>
            {/* Payment section - Review  Items */}
            <div className="payment__section">
                <div className="payment__title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment___items">
                    {basket.map((item,i) => (
                        <CheckOutProduct
                            key={i}
                            index={i}
                            id={item.id}
                            title={item.title}
                            image = {item.image}
                            price = {item.price}
                            rating = {item.rating}
                        />
                    ))}
                </div>
            </div>
            {/* Payment section - Payment Method */}
            <div className="payment__section">
                <h3>Payment Method</h3>
                <div className="payment__details">
                    {/* Stripe Magic */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange} />
                        <div className="payment___priceContainer">
                        <CurrencyFormat 
                        renderText={(value) => (
                            <h3>Order Total: {value}</h3>
                        )}
                        decimalScale={2}
                        value={getBasketTotal(basket)}
                        displayType='text'
                        thousandSeparator = {true}
                        prefix='$'
                        />
                        <button disabled={processing || disabled || succeeded} onl>
                            <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                        </button>
                        </div>
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

Payment.propTypes = {
    user: PropTypes.any
}

export default Payment