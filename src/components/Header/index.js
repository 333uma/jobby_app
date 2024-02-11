import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <ul className="nav_container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav_website"
        />
      </Link>
      <ul className="link_container">
        <Link to="/" className="link_item">
          <li>Home</li>
        </Link>
        <Link to="/jobs" className="link_item">
          <li>Jobs</li>
        </Link>
        <li>
          <button
            type="button"
            className="logout_button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </ul>
  )
}

export default withRouter(Header)
