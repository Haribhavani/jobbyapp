import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onRedirectToJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-con">
        <h1 className="heading">
          Find The Job That
          <br /> Fits Your Life
        </h1>
        <p className="para">Millions of people are searching for jobs</p>
        <Link to="/jobs" className="link-con">
          <button onClick={onRedirectToJobs} type="button" className="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}
export default Home
