// import { useState, useEffect } from "react";

// export default function useAPiFetch(location) {
//   const [weatherData, setWeatherData] = useState({});

  
//   useEffect(() => {
//         let url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&q=${location}`;
//         let apiId = "3e7be884167e55c7191a73cfa5b76965";
//         let fullURL = `${url}&appid=${apiId}`;
//         // console.log(fullURL)
        
//         let fetchApi = fetch(fullURL)
//         .then((res)=> res.json())
//         .then((data)=> setWeatherData(data))
            
        
//     }, [ location ]);
//         console.log(weatherData)
//         return weatherData ;
// }

// // https://api.openweathermap.org/data/2.5/forecast?units=metric&q=kolkata&appid=3e7be884167e55c7191a73cfa5b76965