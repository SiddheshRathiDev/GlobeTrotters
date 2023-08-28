import TripsNavigation from "../../components/TripsNavigation/TripsNavigation"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"

const Home = () => {
  return (
    <div className="home">
      <TripsNavigation/>
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home