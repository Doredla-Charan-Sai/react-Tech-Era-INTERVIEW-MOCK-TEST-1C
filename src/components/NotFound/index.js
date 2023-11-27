import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="bg-cont">
    <Header />
    <div className="not-found-cont">
      <img
        className="not-found-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
        alt="not found"
      />
      <h1 className="oops-txt">Page Not Found</h1>
      <p className="failure-para">
        We are sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)
export default NotFound
