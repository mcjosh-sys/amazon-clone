import './App.css';
import {Routes, Route } from 'react-router-dom';
import Checkout from './pages/checkout/Checkout';
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Signin from './pages/signin/Signin';
import { useLocation } from 'react-router-dom';
import { auth } from './firebase';
import { useEffect } from 'react';
import { useStateValue } from './context/StateContext';
import Payment from './pages/payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './pages/orders/Orders';

const promise = loadStripe('pk_test_51OMfQ7JYbtwIrQ9t6K9HZZg2IsIVGiTbghmVWTEul7NOFk117TkQfG5CK9RLbUl2M59xfym9NJt4oOZS57W1kNns00PaudIHNk')


function App() {

  const [{user},dispatch] = useStateValue()

  

  useEffect(()=>{
    auth.onAuthStateChanged( user => {
      
      if(user){
        dispatch({
          type: 'SET_USER',
          user: user
        })
        //console.log(user)
      } else {
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }

    })
  },[])

  const page =  useLocation().pathname.split('/').pop()
  return (
    <div className="app">
      {(page !== 'signin' && page !== 'signup') && <Header />}
      <Routes>
        <Route path='/orders' element={<Orders />} />
        <Route path='/payment' element={
          <Elements stripe={promise}>
            <Payment user={user} /> 
          </Elements>
        }
        />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
