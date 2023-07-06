import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import Header from '../Header'
import JobCardItem from '../JobCardItem'
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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const apiJobsStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const failureViewImg =
  'https://assets.ccbp.in/frontend/react-js/failure-img.png'

class AllJobs extends Component {
  state = {
    profilesData: [],
    jobsData: [],
    checkBoxInput: [],
    radioInput: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
    apiJobsStatus: apiJobsStatusConstants.initial,
  }

  componentDidMount() {
    this.onGetProfileDetails()
    this.onGetJobsDetails()
  }

  onGetProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt-token')
    // eslint-disable-next-line no-unused-vars
    const {checkBoxInput, radioInput, searchInput} = this.state
    const apiUrl = ' https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = [await response.json()]
      const updatedProfileData = fetchedData.map(each => ({
        name: each.profile_details.name,
        profileImageUrl: each.profile_details.profile_image_url,
        shortBio: each.profile_details.short_bio,
      }))
      this.setState({
        profilesData: updatedProfileData,
        responseSuccess: true,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onGetJobsDetails = async () => {
    this.setState({apiJobsStatus: apiJobsStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt-token')
    const {checkBoxInput, searchInput, radioInput} = this.setState
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxInput}&minimum_package=${radioInput}&
     search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseJobs = await fetch(apiUrl, options)
    if (responseJobs.ok === true) {
      const fetchedJobData = await responseJobs.json()
      const updatedJobData = fetchedJobData.jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({
        jobsData: updatedJobData,
        apiJobsStatus: apiJobsStatusConstants.success,
      })
    } else {
      this.setState({apiJobsStatus: apiJobsStatusConstants.failure})
    }
  }

  onGetRadioOption = event => {
    this.setState({radioInput: event.target.value}, this.onGetJobsDetails)
  }

  onGetInputOption = event => {
    const {checkBoxInput} = this.state
    const inputNotInList = checkBoxInput.filter(each => each === each.target.id)
    if (inputNotInList.length === 0) {
      this.setState(
        prevState => ({
          checkBoxInput: [...prevState.checkBoxInput, event.target.id],
        }),
        this.onGetJobsDetails,
      )
    } else {
      const filterData = checkBoxInput.filter(each => each !== event.target.id)

      this.setState(
        // eslint-disable-next-line no-unused-vars
        prevState => ({checkBoxInput: filterData}),
        this.onGetJobsDetails,
      )
    }
  }

  onGetProfileView = () => {
    const {profilesData, responseSuccess} = this.state
    if (responseSuccess) {
      const {name, profileImageUrl, shortBio} = profilesData[0]
      return (
        <div className="profile-con">
          <img src={profileImageUrl} className="profile" alt="profile" />
          <h1 className="name">{name}</h1>
          <p className="para">{shortBio}</p>
        </div>
      )
    }
    return null
  }

  onRetryProfile = () => {
    this.onGetProfileDetails()
  }

  onGetProfileFailureView = () => (
    <div className="failure-con">
      <button className="button" type="button" onClick={this.onRetryProfile}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRenderProfileStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.onGetProfileView()
      case apiStatusConstants.failure:
        return this.onGetProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onRetryJobs = () => {
    this.onGetJobsDetails()
  }

  onGetJobFailureView = () => (
    <div className="failure-img-con">
      <img src={failureViewImg} alt="failure view" className="image" />
      <h1 className="heading">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for
      </p>

      <div className="failure-button-con">
        <button type="button" className="button" onClick={this.onRetryJobs}>
          Retry
        </button>
      </div>
    </div>
  )

  onGetJobView = () => {
    const {jobsData} = this.state
    const noJobs = jobsData.length === 0
    return noJobs ? (
      <div className="no-job-con">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="image"
        />
        <h1 className="heading">No Jobs Found</h1>
        <p className="para">We could not find any jobs. Try other filters</p>
      </div>
    ) : (
      <ul className="ul-item">
        {jobsData.map(each => (
          <JobCardItem key={each.id} jobData={each} />
        ))}
      </ul>
    )
  }

  onRenderJobStatus = () => {
    const {apiJobsStatus} = this.state

    switch (apiJobsStatus) {
      case apiJobsStatusConstants.success:
        return this.onGetJobView()
      case apiJobsStatusConstants.failure:
        return this.onGetJobFailureView()
      case apiJobsStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onGetCheckBoxView = () => (
    <ul className="check-con">
      {employmentTypesList.map(each => (
        <li className="li-con" key={each.employmentTypeId}>
          <input
            className="input"
            type="checkBox"
            id={each.employmentTypeId}
            onClick={this.onGetInputOption}
          />
          <label className="label" htmlFor={each.employmentTypeId}>
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetRadioButtonView = () => (
    <ul className="check-con">
      {salaryRangesList.map(each => (
        <li className="li-con" key={each.salaryRangeId}>
          <input
            className="radio"
            name="option"
            type="checkBox"
            id={each.salaryRangeId}
            onChange={this.onGetRadioOption}
          />
          <label className="label" htmlFor={each.salaryRangeId}>
            {each.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onGetSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearchInput = () => {
    this.onGetJobsDetails()
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.onGetJobsDetails()
    }
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const {checkBoxInput, radioInput, searchInput} = this.state
    return (
      <>
        <Header />
        <div className="all-job-con">
          <div className="slide-bar">
            {this.onRenderProfileStatus()}
            <hr className="hr-line" />
            <h1 className="name">Type of Employment</h1>
            {this.onGetCheckBoxView()}
            <hr className="hr-line" />
            <h1 className="range">Salary Range</h1>
            {this.onGetRadioButtonView()}
          </div>
          <div className="job-con">
            <div>
              <input
                className="search-input"
                type="search"
                value={searchInput}
                onClick={this.onGetSearchInput}
                onChange={this.onEnterSearchInput}
                placeholder="Search"
              />
              <button
                className="button"
                type="button"
                onClick={this.onSubmitSearchInput}
                data-testid="searchButton"
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </div>
            {this.onRenderJobStatus()}
          </div>
        </div>
      </>
    )
  }
}
export default AllJobs
