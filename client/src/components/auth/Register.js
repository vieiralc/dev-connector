import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
//import axios from 'axios'

const Register = () => {

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
        if (password !== password2)
            console.log('Passwords do not match')
        else {
            console.table(formData)
            // const newUser = { name, email, password }
            
            // try {
            //     const config = {
            //         headers: {
            //             'Content-Type': 'application/json'
            //         }
            //     }

            //     const body = JSON.stringify(newUser)

            //     const res = await axios.post('/api/users/register', body, config)
            //     console.log(res.data)
            // } catch (error) {
            //     console.error(error.response.data)
            // }
        }
    }

    return (
        <Fragment>
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
        </Fragment>
    )
}

export default Register

// import React, { Component } from "react"
// import PropTypes from 'prop-types'
// import { withRouter } from 'react-router-dom'
// import { connect } from 'react-redux'
// import { registerUser } from '../../actions/authActions'
// import TextFieldGroup from '../common/TextFieldGroup'

// class Register extends Component {

//     constructor() {
//         super()
//         this.state = {
//             name: "",
//             email: "",
//             password: "",
//             password2: "",
//             errors: {}
//         }

//         this.onChange = this.onChange.bind(this)
//         this.onSubmit = this.onSubmit.bind(this)
//     }

//     componentDidMount() {
//         if (this.props.auth.isAuthenticated)
//             this.props.history.push('/dashboard')
//     }

//     componentWillReceiveProps(nextProps) {
//         if (nextProps.errors) {
//             this.setState({errors: nextProps.errors})
//         }
//     }

//     onChange(e) {
//         this.setState({ [e.target.name]: e.target.value })
//     }

//     onSubmit(e) {
//         e.preventDefault();

//         const newUser = {
//             name: this.state.name,
//             email: this.state.email,
//             password: this.state.password,
//             password2: this.state.password2
//         }

//         this.props.registerUser(newUser, this.props.history)
//     }

//     render() {
//         const { errors } = this.state

//         return (
//             <div className="register">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-8 m-auto">
//                             <h1 className="display-4 text-center">Sign Up</h1>
//                             <p className="lead text-center">
//                                 Create your DevConnector account
//                             </p>

//                             <form onSubmit={this.onSubmit}>

//                                 <TextFieldGroup
//                                     placeholder="Name"
//                                     name="name"
//                                     value={this.state.name}
//                                     onChange={this.onChange}
//                                     error={errors.name}
//                                 />

//                                 <TextFieldGroup
//                                     placeholder="Email Address"
//                                     type="email"
//                                     name="email"
//                                     value={this.state.email}
//                                     onChange={this.onChange}
//                                     error={errors.email}
//                                     info="This site uses Gravatar so if you want a profile image, use
//                                     a Gravatar email"
//                                 />

//                                 <TextFieldGroup
//                                     placeholder="Password"
//                                     type="password"
//                                     name="password"
//                                     value={this.state.password}
//                                     onChange={this.onChange}
//                                     error={errors.password}
//                                 />

//                                 <TextFieldGroup
//                                     placeholder="Confirm Password"
//                                     type="password"
//                                     name="password2"
//                                     value={this.state.password2}
//                                     onChange={this.onChange}
//                                     error={errors.password2}
//                                 />

//                                 <input type="submit" className="btn btn-info btn-block mt-4" />
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// Register.propTypes = {
//     registerUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// }

// const mapStateToProps = (state) => ({
//     auth: state.auth,
//     errors: state.errors
// })

// export default connect(mapStateToProps, { registerUser })(withRouter(Register))
