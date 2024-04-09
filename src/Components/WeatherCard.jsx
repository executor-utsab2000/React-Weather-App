import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAPiFetch from './ApiFetchHook.js'
import './StyleFiles/WeatherCard.scss'
import WeatherLoader from './WeatherLoader.jsx';

export default function WeatherCard() {

    const [location, setLocation] = useState('')
    const [weatherDataList, setWeatherDataList] = useState([])
    const [weatherData, setWeatherData] = useState({})
    const [ifValuePresent, setValuePresent] = useState(false)
    const [distinctDates, setDistinctDates] = useState([])
    const [tempDescription, setTempDescription] = useState()






    const data = useAPiFetch(location)
    // console.log(data);

    const tempSearch = (event) => {
        setValuePresent(false)
        event.preventDefault();


        if (data && data.list) {
            // console.log(data);
            setValuePresent(true)
            setWeatherData(data)
            setWeatherDataList(data.list);
            setTempDescription(data.list[0].weather[0].main)
        }
        if (location == '') {
            toast.warn(data.message)
        }
        else if(data.cod == 404){
            toast.warn('City Not Found')
        }
    };


    // console.log(tempDescription);


    weatherDataList.map((elm) => {
        const dates = elm.dt_txt

        let onlyDate = dates.split(" ")[0]
        if (!distinctDates.includes(onlyDate)) {
            distinctDates.push(onlyDate)
        }
    })




    return (

        <>
            <div className="container-fluid px-0 d-flex justify-content-center" style={{ flexDirection: 'column' }}>

                <div className="container row">
                    <div className="col-12 d-flex justify-content-center">
                        <form onSubmit={tempSearch} className={`searchForm  ${ifValuePresent ? '' : 'position-fixed b'}`}>
                            <input type="text" placeholder='Enter City Name (Eg. Kolkata, London, etc.)' value={location} onChange={(event) => setLocation(event.target.value)} />
                            <button type="submit" id='searchBtn'>
                                <i className="fa-solid fa-magnifying-glass fs-5"></i>
                            </button>
                        </form>
                    </div>
                </div>

                {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
                {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */}


                {

                    ifValuePresent ? <div className="container row mx-auto">

                        <div className="col-12 my-2">

                            <div className="weatherCardContainer" style={{
                                backgroundImage: `url(${tempDescription == 'Clouds' ? 'https://i.pinimg.com/originals/67/24/49/6724494d5d5ad8d046745f078887a86a.gif' :
                                    tempDescription == 'Rain' ? 'https://i.gifer.com/QAOA.gif' :
                                        tempDescription == 'Clear' ? 'https://i.pinimg.com/originals/c8/ba/30/c8ba30ee61944cc26dbde4022a0a4b72.gif' : ''

                                    })`
                            }}>
                                <div className="overlay"></div>
                                <div className="contentContainer pt-lg-5 pt-4">
                                    <div className="content d-flex fs-1">
                                        <span className="temp">{Math.ceil(weatherData.list[0].main.temp)}</span>
                                        <span className="contentTxt">
                                            <div className="placeName">{weatherData.city.name}</div>
                                            <div className="countryName">{weatherData.city.country}</div>
                                        </span>
                                    </div>


                                    <div className="maxMinTemp mt-3 mt-md-0">
                                        <span className="">{weatherData.list[0].main.temp_max} °</span>
                                        <span className='mx-2 fs-5'>/</span>
                                        <span className="">{weatherData.list[0].main.temp_min} °</span>
                                    </div>

                                </div>
                            </div>
                        </div>



                        <div className="col-12 mt-4">
                            {
                                distinctDates.map((distinctDt) => {
                                    return (

                                        <div className="card p-3 weatherCard my-3" key={Math.random()}>
                                            <div className=" row ">
                                                <div className="col-12 date">{distinctDt}</div>
                                                <div className="col-12">
                                                    <div className="row">

                                                        {
                                                            weatherDataList.filter((elm) => {
                                                                const dates = elm.dt_txt.split(" ")[0];
                                                                if (dates == distinctDt) {
                                                                    return dates
                                                                }
                                                            }).map((temps) => {
                                                                const desc = temps.weather[0].main;
                                                                // console.log(desc);

                                                                return (
                                                                    <div className="col" key={Math.random()}>
                                                                        <div className="hourlyDetailsContainer my-2 my-lg-0 text-center">
                                                                            <div className="temp">{(temps.main.temp).toFixed(2)}</div>

                                                                            <div className="icon">{<i className={`
                                                    ${desc == '' ? 'fa-solid fa-xmark text-danger' :
                                                                                    desc == 'Clouds' ? 'fa-solid fa-cloud text-secondary' :
                                                                                        desc == 'Rain' ? 'fa-solid fa-cloud-rain text-info' :
                                                                                            desc == 'Clear' ? 'fa-solid fa-sun' : ''
                                                                                } fs-3 my-2`}></i>}</div>

                                                                            <div className="time">{temps.dt_txt.split(' ')[1]}</div>
                                                                            {/* <div className="amPm">PM</div> */}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )


                                })


                            }


                        </div>
                    </div> : <WeatherLoader />
                }

                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition:Bounce/>
            </div>
        </>
    )

}