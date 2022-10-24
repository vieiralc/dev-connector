import Landing from '../layout/Landing';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Dashboard from '../dashboard/Dashboard';
import CreateProfile from '../profile-forms/UpdateProfile';
import UpdateProfile from '../profile-forms/UpdateProfile';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';

export const ROUTES = [
  {
    key: 'landing_page',
    path: '/',
    private: false,
    component: <Landing />,
  },
  {
    key: 'register',
    path: '/register',
    private: false,
    component: <Register />,
  },
  {
    key: 'login',
    path: '/login',
    private: false,
    component: <Login />,
  },
  {
    key: 'dashboard',
    path: '/dashboard',
    private: true,
    component: <Dashboard />,
  },
  {
    key: 'profile',
    path: '/create-profile',
    private: true,
    component: <CreateProfile />,
  },
  {
    key: 'update_profile',
    path: '/update-profile',
    private: true,
    component: <UpdateProfile />,
  },
  {
    key: 'add_experience',
    path: '/add-experience',
    private: true,
    component: <AddExperience />,
  },
  {
    key: 'add_education',
    path: '/add-education',
    private: true,
    component: <AddEducation />,
  },
  {
    key: 'profiles',
    path: '/profiles',
    private: false,
    component: <Profiles />,
  }
];
