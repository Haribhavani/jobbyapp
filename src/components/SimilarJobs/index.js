import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarJobs = props => {
  const {similarJobsData} = props
  const {
    companyLogoUrl,
    // eslint-disable-next-line no-unused-vars
    id,
    jobDescription,
    location,
    rating,
    title,
    employmentType,
  } = similarJobsData

  console.log(similarJobsData)
  return (
    <li className="list-item">
      <div className="image-con">
        <img
          src={companyLogoUrl}
          className="logo"
          alt="similar job company logo"
        />
        <div className="rating-con">
          <h1 className="heading">{title}</h1>
          <div className="job-rating-con">
            <AiFillStar className="icon" />
            <p className="para">{rating}</p>
          </div>
        </div>
      </div>
      <div className="second-part-con">
        <h1 className="heading">Description</h1>
        <p className="para">{jobDescription}</p>
      </div>
      <div className="location-con">
        <div className="location-job-icon-con">
          <MdLocationOn className="icon" />
          <p className="para">{location}</p>
        </div>
        <div className="employment-type-con">
          <p className="para">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobs
