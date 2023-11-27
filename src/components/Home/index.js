import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}
class Home extends Component {
  state = {
    coursesList: [],
    courseApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCoursesApiCall()
  }

  getCoursesApiCall = async () => {
    this.setState({courseApiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.courses.map(eachCourse => ({
        ...eachCourse,
        logoUrl: eachCourse.logo_url,
      }))
      this.setState({
        courseApiStatus: apiStatusConstants.success,
        coursesList: formattedData,
      })
    } else {
      this.setState({courseApiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getCoursesApiCall()
  }

  renderCases = () => {
    const {courseApiStatus} = this.state
    switch (courseApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-failure">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="loader-failure">
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
      />
      <h1 className="oops-txt">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div className="content-cont">
        <h1 className="main-head">Courses</h1>
        <ul className="courses-list-cont">
          {coursesList.map(eachCourse => (
            <Link
              to={`/courses/${eachCourse.id}`}
              className="link"
              key={eachCourse.id}
            >
              <li className="course-item">
                <img
                  className="logo"
                  src={eachCourse.logoUrl}
                  alt={eachCourse.name}
                />
                <p className="name-txt">{eachCourse.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="bg-cont">
        <Header />
        {this.renderCases()}
      </div>
    )
  }
}
export default Home
