import {Link} from 'react-router-dom'
import {FaStar, FaShoppingBag} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {eachJob} = props
  const {
    companyLogoUrl,
    title,
    id,
    location,
    packagePerAnnum,
    jobDescription,
    employmentType,
    rating,
  } = eachJob

  return (
    <Link to={`/jobs/${id}`} className="link_item">
      <li className="individual_item">
        <div className="intro_container">
          <div className="logo_container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company_logo"
            />
            <div className="title_container">
              <h1>{title}</h1>
              <>
                <FaStar /> <p>{rating}</p>
              </>
            </div>
          </div>
          <div className="location_container">
            <div>
              <MdLocationOn />
              <p>{location}</p>
              <FaShoppingBag /> <p>{employmentType}</p>
            </div>
            <p>{packagePerAnnum}</p>
          </div>
          <hr />
          <h1>Description</h1>
          <p>{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
