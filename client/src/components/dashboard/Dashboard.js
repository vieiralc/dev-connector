import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profile/getCurrentProfile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { Link } from 'react-router-dom';
import { deleteAccount } from '../../redux/actions/profile/deleteAccountProfile';

const Dashboard = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.loading);
  const profile = useSelector((state) => state.profile.profile);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  const deleteMyAccount = () => {
    dispatch(deleteAccount());
  }

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className='container'>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions /> 
          <Experience experiences={profile.experience}/>
          <Education educationArray={profile.education}/>
          
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteMyAccount()}>
              <i className='fas fa-user-minus'></i> &nbsp; Delete My Account
            </button>
          </div>
        </>
      ): (
        <>
          <p>You have not setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </>
      )}
    </div>
  );
};

export default Dashboard;
