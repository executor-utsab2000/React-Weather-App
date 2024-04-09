import Navbar from './Navbar'
import WeatherCard from './WeatherCard'

const Combined = () => {
  return (
    <div className="container-fluid px-0">
      <div className="row">
          <div className="col-12 ">
            <WeatherCard />
          </div>
        </div>
    </div>
  )
}

export default Combined
