import React, { useState, useEffect } from 'react';
import Forecast from './Forecast';
import Alldesc from './Alldesc';

const City = (props) => {
  const [weatherData, setWeatherData] = useState({
    location: props.loc,
    weather: {},
    wdesc: {},
    sys: {},
    image: "",
    date: Date.now(),
    cityname: null,
    description: '',
  });
  
  useEffect(() => {
    console.log(weatherData.location)
    const fetchWeather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherData.location}&units=metric&appid=a2af3cc5b2c23b53f5c256f011eb3494`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        const wdesc = data.weather[0];

        setWeatherData({
          ...weatherData,
          sys: data.sys,
          weather: data.main,
          wdesc,
          cityname: data.name,
          date: data.dt,
          description: wdesc.main,
        });

        selectImage(wdesc);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeather();
  }, [weatherData.location]);

  function selectImage(describe) {
    let ilogo = undefined;
    const imgw = document.getElementById("wdetails");
    const isDaytime = new Date().getHours() >= 5 && new Date().getHours() < 12;
    const isNighttime = new Date().getHours() >= 20 || new Date().getHours() <5;
    const isEveningTime= new Date().getHours()>=16 && new Date().getHours()<20
    const isAfternoonTime= new Date().getHours()>=12 && new Date().getHours()<16
     
    const wdesc=describe
    let imgwUrl = '';

    if (isDaytime) {
      imgwUrl = 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/b9894454827733.596dc6164e918.gif';
      
    }
    else if (isNighttime) {
      imgwUrl = 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/e47a3354827733.596dc61650daa.gif';
      // switch (wdesc.main) {
      //   case 'Clear':
      //     // Set myimage for clear weather
      //     break;
      //   case 'Clouds':
      //     // Set myimage for cloudy weather
      //     break;
      //   case 'Rain':
      //     // Set myimage for rainy weather
      //     break;
      //   // Add more cases for other weather descriptions as needed
      //   default:
      //     // Default image or handling for unknown weather
      //     break;
      // }
    }
      else if(isEveningTime){
        imgwUrl = 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/e47a3354827733.596dc61650daa.gif';
      }
      else if(isAfternoonTime){
        setWeatherData({
        image: 'https://icons8.com/icon/ah6gfFBfIBK4/sun'
  
        })

        imgwUrl = 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/e47a3354827733.596dc61650daa.gif';
      }

    imgw.style.background = `url(${imgwUrl})`;
    console.log(document.getElementById('we_img'))
  }

  const toUpper = (str) => {
    if (str === undefined) {
      return 'Loading....';
    }
    return str[0].toUpperCase() + str.slice(1);
  };

  return (
    <>
      {weatherData.cityname !== null ? (
        <div className="container justify-content-center" id="wea1">
          <div className="card m-5" id="wea" style={{ width: '21rem', height: '27rem', zIndex: '16', borderRadius: '15%' }}>
            <div className="card-body" id="wdetails" style={{ position: 'relative', borderRadius: '15%' }}>
              <div className="d-flex justify-content-between mx-3 mt-1 ">
                <img src="https://icons8.com/icon/1PQfP9t1iMCJ/night" style={{ width: '130px'}} id="we_img" alt="weather ICon" />
                <div className="mt-3">
                  <h5 className="card-title text-center">
                    <em>
                      {weatherData.cityname},{weatherData.sys.country}
                    </em>
                  </h5>
                  <h3 className="card-title text-center m-0 p-0">
                    <em>{weatherData.weather.temp}&#8451; </em>
                  </h3>
                </div>
              </div>
              <p className="card-text text-center my-2" style={{ fontSize: '23px' }}>
                <em>
                  {' '}
                  <small>
                    <small>
                      {' '}
                      Last Updated on <div>{Date(weatherData.date).toString().slice(0, 21)} {new Date(weatherData.date).getHours() >= 12 ? 'Pm' : 'Am'}</div>
                    </small>
                  </small>
                </em>
              </p>
              <hr className="m-0 mx-3" />
              <p className="card-text text-center mt-2 m-0 p-0">
                <em>{weatherData.description}</em>
              </p>
            </div>
          </div>
          <Alldesc />
        </div>
      ) : (
        <div className="container mt-3 d-flex" id="emp" style={{ width: '35rem', opacity: '0.5' }}>
          <div className="card " style={{ borderRadius: '50%' }}>
            <img
              src="https://cdn.dribbble.com/users/1200964/screenshots/3162905/media/13274f81e548c8b0036928f2f4ab39f8.gif"
              className="card-img-top"
              alt="..."
              style={{ borderRadius: '80%', flexShrink: '3' }}
            />
          </div>
        </div>
      )}
      {weatherData.cityname !== null ? <Forecast city={weatherData.cityname}></Forecast> : ''}
    </>
  );
};

export default City;
