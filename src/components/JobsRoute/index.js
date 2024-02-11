import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobItem from '../JobItem'
import EmploymentJobsType from '../EmploymentJobsType'
import SalaryRanges from '../SalaryRanges'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsRoute extends Component {
  state = {
    jobsList: [],
    apiStatus: 'INITIAL',
    searchInput: '',
    activeEmploymentType: [],
    activeSalaryRange: '',
    userData: {},
  }

  componentDidMount() {
    this.getJobs()
    this.getUserDetails()
  }

  getUserDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedUserData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({userData: updatedUserData, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  getJobs = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const {searchInput, activeEmploymentType, activeSalaryRange} = this.state
    const empType = activeEmploymentType.join(',')
    const response = await fetch(
      `https://apis.ccbp.in/jobs?search=${searchInput}&employment_type=${empType}&minimum_package=${activeSalaryRange}`,
      options,
    )
    const data = await response.json()
    if (response.ok) {
      const updatedJobs = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({jobsList: updatedJobs, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  onClickUserRetry = () => {
    this.getUserDetails()
  }

  renderUserSuccessView = () => {
    const {userData} = this.state
    const {name, profileImageUrl, shortBio} = userData

    return (
      <div className="user_container">
        <img src={profileImageUrl} className="profile_image" alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderUserFailureView = () => (
    <button
      type="button"
      onClick={this.onClickUserRetry}
      className="retry_button"
    >
      Retry
    </button>
  )

  renderSuccessView = () => {
    const {jobsList} = this.state
    const showJobs = jobsList.length > 0

    return (
      <>
        {showJobs ? (
          <ul className="jobs_list">
            {jobsList.map(eachJob => (
              <JobItem eachJob={eachJob} key={eachJob.id} />
            ))}
          </ul>
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters</p>
            <button
              type="button"
              className="retry_button"
              onClick={this.onClickRetry}
            >
              Retry
            </button>
          </div>
        )}
      </>
    )
  }

  onClickRetry = () => {
    this.getJobs()
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

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  renderOutput = () => {
    this.getJobs()
  }

  onChangeEmploymentTypeId = employmentId => {
    this.setState(
      prevState => ({
        activeEmploymentType: [...prevState.activeEmploymentType, employmentId],
      }),
      this.getJobs,
    )
  }

  onChangeSalaryRange = salaryRange => {
    this.setState({activeSalaryRange: salaryRange}, this.getJobs)
  }

  renderUserSwitchCase = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'INITIAL':
        return this.renderLoaderView()
      case 'SUCCESS':
        return this.renderUserSuccessView()
      case 'FAILURE':
        return this.renderUserFailureView()
      default:
        return null
    }
  }

  renderJobsSwitchCase = () => {
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
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs_container">
          <div className="right_container">
            {this.renderUserSwitchCase()}
            <ul className="filters_container">
              <h1>Type of Employment</h1>
              {employmentTypesList.map(eachType => (
                <EmploymentJobsType
                  onChangeEmploymentTypeId={this.onChangeEmploymentTypeId}
                  eachType={eachType}
                  key={eachType.employmentTypeId}
                />
              ))}
            </ul>
            <ul className="filters_container">
              <h1>Salary Range</h1>
              {salaryRangesList.map(eachSalary => (
                <SalaryRanges
                  onChangeSalaryRange={this.onChangeSalaryRange}
                  eachSalary={eachSalary}
                  key={eachSalary.salaryRangeId}
                />
              ))}
            </ul>
          </div>
          <div className="left_container">
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              className="jobs_search_input"
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search_button"
              onClick={this.renderOutput}
            >
              <BsSearch className="search-icon" />{' '}
            </button>
            {this.renderJobsSwitchCase()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsRoute
