import './StyleFiles/WeatherLoader.css';


const WeatherLoader = () => {
    return (
        <div className="mainContainer">
            <div className="loaderContainer">
                <div className="cloud front">
                    <span className="left-front"></span>
                    <span className="right-front"></span>
                </div>
                <span className="sun sunshine"></span>
                <span className="sun"></span>
                <div className="cloud back">
                    <span className="left-back"></span>
                    <span className="right-back"></span>
                </div>
            </div>
        </div>
    )
}

export default WeatherLoader
