import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getCurrentProfile } from "../../redux/actions/profile/getCurrentProfile"

const Dashboard = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentProfile())
  }, [])

  return (
    <div className='container'>Dashboard</div>
  )
}

export default Dashboard

// import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { getCurrentProfile, deleteAccount } from '../../actions/profileActions'
// import Spinner from '../common/Spinner'
// import ProfileACtions from './ProfileActions'
// import Experience from './Experience'
// import Education from './Education'

// class Dashboard extends Component {
    
//     componentDidMount() {
//         this.props.getCurrentProfile()
//     }

//     onDeleteClick(e) {
//         this.props.deleteAccount()   
//     }

//     render() {

//         const { user } = this.props.auth
//         const { profile, loading } = this.props.profile

//         let dashBoardContent

//         if (profile  === null || loading) {
//             dashBoardContent = <Spinner/>
//         } else {
//             // Check if logged in user has profile data
//             if (Object.keys(profile).length > 0) {
//                 dashBoardContent = (
//                     <div>
//                         <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}> {user.name} </Link> </p>
//                         <ProfileACtions/>
//                         <Experience experience={profile.experience} />
//                         <Education education={profile.education} />
//                         <div style={{marginBottom: '60px'}}/>
//                         <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">Delete My Accounts</button>
//                     </div>
//                 )
//             } else {
//                 // User is logged in but has no profile
//                 dashBoardContent = (
//                     <div>
//                         <p className="lead text-muted">Welcome { user.name } </p>
//                         <p> You have not yet setup a profile, please add some info</p>
//                         <Link to="/create-profile" className="btn btn-lg btn-info">
//                             Create Profile
//                         </Link>
//                     </div>
//                 )
//             }
//         }

//         return (
//             <div className="dashboard">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-md-12">
//                             <h1 className="display-4">Dashboard</h1>
//                             {dashBoardContent}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

// Dashboard.propTypes = {
//     getCurrentProfile: PropTypes.func.isRequired,
//     deleteAccount: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     profile: PropTypes.object.isRequired
// }

// const mapStateToProps = state => ({
//     profile: state.profile,
//     auth: state.auth
// })

// export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard)
