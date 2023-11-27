import {Link, withRouter} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="header-cont">
    <Link to="/">
      <img
        className="web-logo"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
      />
    </Link>
  </nav>
)
export default withRouter(Header)
