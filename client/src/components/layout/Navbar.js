import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUserData } from "../../redux/reducers/authSlice"

const Navbar = () => {

  const loading = useSelector(state => state.auth.loading)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(clearUserData())
  }

  const authLinks = (
    <ul>
      <li>
        <Link onClick={() => logout()}>
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </Link>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li><Link to="#!">Developers</Link></li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {
        !loading && (
          <>
            {
              isAuthenticated ? authLinks : guestLinks
            }
          </>
        )
      }
    </nav>
  )
}

export default Navbar