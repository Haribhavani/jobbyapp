import {Link, withRouter} from 'react-router-dom'
import {ImHome} from 'react-icons/im'
import {FiLogOut} from 'react-icons/fi'
import {Cookies} from 'js-cookie'
import './index.css'

const webUrl = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt-token')
    history.replace('/login')
  }
  return (
    <nav className="nav-con">
      <ul className="ul-item">
        <li className="logo-con">
          <Link to="/" className="link">
            <img src={webUrl} className="logo" alt="website logo" />
          </Link>
        </li>
        <li className="home-con">
          <Link className="link" to="/">
            <ImHome className="icon" />
            <h1 className="heading">Home</h1>
          </Link>
        </li>
        <li>
          <Link className="link" to="/jobs">
            <h1 className="heading">Jobs</h1>
          </Link>
        </li>
        <li>
          <FiLogOut className="icon" onClick={onClickLogOut} />
          <button type="button" className="button" onClick={onClickLogOut}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
