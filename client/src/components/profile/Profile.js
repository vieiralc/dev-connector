import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../redux/actions/profile/getProfiles';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';

const Profile = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);
    const loading = useSelector(state => state.profile.loading);
    const auth = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getProfileById(id));
    }, [])

    if (profile === null || loading) {
        return <Spinner/>
    }

    return (
        <div className='container'>
            <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
            {
                auth.isAuthenticated && 
                !auth.loading && 
                auth.user?._id === profile?.user?._id && (
                    <Link to='/update-profile' className='btn btn-dark'>Edit Profile</Link>
                )
            }
            <div className='profile-grid my-1'>
                <ProfileTop profile={profile}/>
                <ProfileAbout profile={profile}/>
                <ProfileExperience experiences={profile.experience}/>
                <ProfileEducation educationArray={profile.education}/>
            </div>
        </div>
    )
}

export default Profile;