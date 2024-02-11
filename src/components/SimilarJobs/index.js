import {FaStar, FaShoppingBag} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {each} = props
  const {
    title,
    companyLogoUrl,
    rating,
    location,
    jobDescription,
    employmentType,
  } = each

  return (
    <li className="individual_job">
      <div className="inner_cont1">
        <img
          src={companyLogoUrl}
          className="company_logo"
          alt="similar job company logo"
        />
        <div>
          <h1>{title}</h1>
          <FaStar /> <p>{rating}</p>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div className="location">
        <MdLocationOn />
        <p> {location}</p>
        <FaShoppingBag />
        <p>{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobs
