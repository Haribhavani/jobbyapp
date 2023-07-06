import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const jobCardItem = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item-con">
        <div className="fir-con">
          <div className="img-con">
            <img src={companyLogoUrl} alt="company logo" className="logo" />
            <div className="rating-con">
              <h1 className="heading">{title}</h1>
              <div className="star-rating-con">
                <AiFillStar className="icon" />
                <p className="para">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-con">
            <div className="location-type-con">
              <div className="icon-con">
                <MdLocationOn className="icon" />
                <p className="para">{location}</p>
              </div>
              <div className="type-icon-con">
                <p className="para">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="para">{packagePerAnnum}</p>
            </div>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="second-part-con">
          <h1 className="para-heading">Description</h1>
          <p className="para">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default jobCardItem
