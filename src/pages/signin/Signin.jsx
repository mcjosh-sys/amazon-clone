import { useEffect, useState } from 'react'
import './signin.css'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, loginUser} from '../../firebase'
import { useStateValue } from '../../context/StateContext'

function Signin() {

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const [{user, location}, dispatch] = useStateValue()
    console.log("user",user)

    const handleChange = (e) => {
        setInputs(prev => ({
            ...prev, [e.target.name]: e.target.value
        }))

    }

    const signIn = (e) => {
        e.preventDefault()
        loginUser(inputs.email, inputs.password)
        .then(user => {
            navigate(location ? location : '/')
            if (user) {
                dispatch({
                    type: 'REDIRECT',
                    location: null
                })
            }
        })
        .catch(error => console.log(error.message))
    }
    
    const signUp = async () => {
       registerUser(inputs.email, inputs.password)
       .then(user => {
        if (user) {
            navigate(location ? location : '/')
            dispatch({
                type: 'REDIRECT',
                location: null
            })
        }
       })
       .catch(error => console.log(error.message))
        
    }

    useEffect(()=>{
        if (user) {
            navigate(location ? location : '/')
            dispatch({
                type: 'REDIRECT',
                location: null
            })
        }
    },[user])

  return (
    <div className='signin'>
        <Link to='/'>
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' className='signin__logo' alt=''/>
        </Link>
        <div className="signin__container">
            <h1>Sign-In</h1>
            <form>
                <h5>Email</h5>
                <input type="email" name='email' onChange={handleChange} value={inputs.email}/>

                <h5>Password</h5>
                <input type="password" name='password' onChange={handleChange} value={inputs.password}/>

                <button className='signin__button' type='Submit' onClick={signIn}>Sign In</button>
            </form>
            <p>By signing-in you agree to Amazon-Clone Conditions of Use & Sale.
                Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
            </p>
            <button className='signup__button' onClick={signUp}>Create your Amazon Account</button>
        </div>
    </div>
  )
}


export default Signin