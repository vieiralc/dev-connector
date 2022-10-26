import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../redux/actions/profile/getProfiles'

const Profile = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    // const profile = useSelector(state => state.profile.profile);
    // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        dispatch(getProfileById(id));
    }, [])

    return (
        <div>
            profile works!
        </div>
    )
}

export default Profile;