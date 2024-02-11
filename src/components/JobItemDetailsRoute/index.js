import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaShoppingBag} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import SkillsItem from '../SkillsItem'
import SimilarJobs from '../SimilarJobs'

import './index.css'
import Header from '../Header'

class JobItemDetailsRoute extends Component {
  state = {jobDetails: {}, skills: [], similarJobs: [], apiStatus: 'INITIAL'}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        title: data.job_details.title,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        rating: data.job_details.rating,
        packagePerAnnum: data.job_details.package_per_annum,
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      const updatedSkills = data.job_details.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))
      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        apiStatus: 'SUCCESS',
        skills: updatedSkills,
        similarJobs: updatedSimilarJobs,
        jobDetails: updatedJobDetails,
      })
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {jobDetails, skills, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      title,
      rating,
      location,
      employmentType,
      jobDescription,
      packagePerAnnum,
      description,
      imageUrl,
    } = jobDetails

    return (
      <div className="individual_job">
        <div className="title_container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company_logo"
          />
          <div>
            <h1>{title}</h1>
            <FaStar />
            <p> {rating}</p>
          </div>
        </div>
        <div className="location_container">
          <div>
            <MdLocationOn />
            <p>{location}</p>
            <FaShoppingBag />
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <div className="description">
          <h1>Description</h1>
          <a href={companyWebsiteUrl}>Visit</a>
        </div>
        <p>{jobDescription}</p>
        <ul className="skills_list">
          <h1>Skills</h1>
          {skills.map(each => (
            <SkillsItem each={each} key={each.name} />
          ))}
        </ul>
        <div className="life_container">
          <div>
            <h1>Life At Company</h1>
            <p>{description}</p>
          </div>
          <img src={imageUrl} alt="life at company" className="life_img" />
        </div>
        <ul className="similar_jobs_list">
          <h1>Similar Jobs</h1>
          {similarJobs.map(each => (
            <SimilarJobs each={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="failure_container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure_image"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry_button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderSwitchCase = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'INITIAL':
        return this.renderLoaderView()
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job_bg_container">
        <Header />
        {this.renderSwitchCase()}
      </div>
    )
  }
}

export default JobItemDetailsRoute
