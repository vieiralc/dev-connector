import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../../redux/reducers/alertSlice'
import { registerNewUser } from '../../redux/actions/auth/registerNewUser'

const Register = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const loading = useSelector(state => state.auth.loading)
    const navigate = useNavigate()
    const dispatch = useDispatch() 

    useEffect(() => {
        if (isAuthenticated && !loading) {
            navigate("/dashboard")
        } 
    }, [isAuthenticated, loading])
    

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = async e => {
        e.preventDefault()
        if (password !== password2) {
            dispatch(setAlert({ message: 'Passwords do not match', alertType: 'danger' }))
        } else {
            dispatch(registerNewUser({ name, email, password }))
        }
    }

    if (loading) {
        return <h1 className='container'>Loading...</h1>
    }

    return (
        <section className='container'>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Create Your Account
            </p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input 
                        type='text' 
                        placeholder='Name' 
                        name='name' 
                        value={name} 
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
                <div className='form-group'>
                    <input 
                        type='email' 
                        placeholder='Email Address' 
                        name='email'
                        value={email} 
                        onChange={e => onChange(e)}
                        required
                    />
                    <small className='form-text'>
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
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
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        minLength='6'
                        value={password2} 
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <input type='submit' className='btn btn-primary' value='Register' />
            </form>
            <p className='my-1'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </section>
    )
}

export default Register