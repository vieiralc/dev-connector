import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const DisplayForLoggedInUsers = (
    <>
      <p> You are already logged in </p>
      <Link to='/dashboard' className='btn btn-primary'>
        {' '}
        Go back to dashboard{' '}
      </Link>
    </>
  );

  const DisplayForLogoutUsers = (
    <>
      <Link to='/register' className='btn btn-primary'>
        {' '}
        Sign Up{' '}
      </Link>
      <Link to='/login' className='btn btn-light'>
        {' '}
        Login{' '}
      </Link>
    </>
  );

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Developer Connector</h1>
          <p className='lead'>
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className='buttons'>
            {isAuthenticated ? DisplayForLoggedInUsers : DisplayForLogoutUsers}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
