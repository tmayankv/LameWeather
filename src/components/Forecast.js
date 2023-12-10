import React, { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Forecast(props){
  
let loca= props.city
    let [forecast, setforecast] = useState([])
    let [spara, setspara] = useState({})
    
    
    const fetchForecast=async()=>{
     let url=`https://api.openweathermap.org/data/2.5/forecast?q=${loca}&units=metric&appid=a2af3cc5b2c23b53f5c256f011eb3494`
    let data = await fetch(url)
    let response=await data.json()
    console.log(response)
    console.log(response.list)
      setforecast(response.list)
      setspara(response)
    console.log(response)
    }

    useEffect(() => {
     fetchForecast()
    },[loca])
    return (
    <div class="det container mt-5 mb-5 card text-center" style={{background:`url('https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production%20Library/23-12-2022_WMO_Bosnia-Herzegovina.jpg/image1170x530cropped.jpg')`, backgroundRepeat:"no-repeat", backgroundSize:"500% 1000px", fontSize:"20px",borderRadius:"20px",overflow:"hidden"}}>
        <div class="card-header">
    Forecast For {loca}
  </div>
  <div class="card-body row" id="forBody">
  {forecast.map((element)=>{
    let dat= new Date((element.dt)*1000)
    let forecastBox=(<div class="col-3 m-0" style={{width:"15rem"}} >
    <div class="card text-align-left mb-2" id="forBox" style={{borderRadius:"25%"}}>
      <div class="card-body " style={{position:"absolute", top:"30px"}}>
        <h5 class="card-title  mb-1" id="fTemp" >{element.main.temp}&#8451;</h5>
        <p class="card-text mb-1">{dat.toDateString().slice(0,3)}</p>
        <p class="card-text  mb-1">{dat.toDateString().slice(3,)}</p>
        <p class="card-text">{element.weather[0].main}</p>
      </div>
    </div>
  </div>)
    if(Number(Date().slice(16,18))>=Number(dat.toString().slice(16,18)) && (Number(Date().slice(16,18))<Number(dat.toString().slice(16,18))+3)){
    return(forecastBox) 
      }
    })
    }
  </div>
  <Link class="btn" id="forecastBtn"
   to = {`/Forecastgraph`} > <span className='icon'>Detailed Graph</span></Link>
</div>
       )
  }
export default Forecast