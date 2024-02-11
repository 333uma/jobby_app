import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const HomeRoute = () => (
  <>
    <Header />
    <div className="home_container">
      <h1 className="home_heading">Find The Job That Fits Your Life</h1>
      <p className="home_description">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your ability and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="find_jobs">
          Find Jobs
        </button>
      </Link>
    </div>
  </>
)

export default HomeRoute
