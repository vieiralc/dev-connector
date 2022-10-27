import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../redux/actions/profile/getProfiles';
import ProfileItem from './ProfileItem';

const Profiles = () => {

    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profile.profiles);
    const loading = useSelector(state => state.profile.loading);

    useEffect(() => {
        dispatch(getProfiles());
    }, [])

    if (loading) {
        return <Spinner/>
    }

    return (
        <div className='container'>
            <h1 className='large text-primary'>Developers</h1>
            <p className='lead'>
                <i className='fab fa-connectdevelop'></i> Browse and connect with developers
            </p>
            <div className='profiles'>
                {
                    profiles.length > 0 ? (
                        <>
                            {
                                profiles.map(profile => (
                                    <ProfileItem 
                                        key={profile._id} 
                                        profile={profile}
                                    />
                                ))
                            }
                        </>
                    ) : (
                        <h4> No profiles found... </h4>
                    )
                }
            </div>
        </div>
    )
}

export default Profiles;