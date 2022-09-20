import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../redux/actions/auth/loginUser'

function Login() {

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const { email, password } = formData

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault()
        dispatch(loginUser(email, password))
    }

    return (
        <section className='container'>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Sign Into Your Account
            </p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        type='email' 
                        placeholder='Email Address' 
                        name='email'
                        value={email} 
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        minLength='6'
                        value={password} 
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <input type='submit' className='btn btn-primary' value='Login' />
            </form>
            <p className='my-1'>
                Don't have an account? <Link to='/register'>Register</Link>
            </p>
        </section>
    )
}

export default Login