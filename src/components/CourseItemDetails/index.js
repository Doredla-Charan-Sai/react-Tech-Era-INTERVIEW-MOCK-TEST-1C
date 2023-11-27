import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const apiStatusConstants = {
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}
class CourseItemDetails extends Component {
  state = {
    courseItemDetailsList: [],
    courseItemDetailsApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getCourseItemApiCall()
  }

  getCourseItemApiCall = async () => {
    this.setState({courseItemDetailsApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        ...data.course_details,
        imageUrl: data.course_details.image_url,
      }
      this.setState({
        courseItemDetailsList: formattedData,
        courseItemDetailsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({courseItemDetailsApiStatus: apiStatusConstants.failure})
    }
  }

  onRetry = () => {
    this.getCourseItemApiCall()
  }

  renderCases = () => {
    const {courseItemDetailsApiStatus} = this.state
    switch (courseItemDetailsApiStatus) {
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
    const {courseItemDetailsList} = this.state
    const {name, description, imageUrl} = courseItemDetailsList
    return (
      <div className="course-item-cont">
        <div className="course-item-view">
          <img className="course-img" src={imageUrl} alt={name} />
          <div className="course-details-cont">
            <h1 className="course-title">{name}</h1>
            <p className="course-para">{description}</p>
          </div>
        </div>
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
export default CourseItemDetails
