import React, { useCallback, useEffect, useState } from 'react'
import City from './components/City'
import Empty from './components/Empty.js'
import Navbar from './components/Navbar'
import sunset from './components/images/weather-forecast-background.jpg'
import sunny from './components/images/sunny.jpg'
import {
  HashRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Forecastgraph from './components/Forecastgraph'

function App(){
   let scity=[]
   let sc= ""
   
   const [city, setcity] = useState(sc.value)
   const thfun= useCallback(()=>{
     sc=document.getElementById('secity')
        setcity(sc.value)
   },[city])
       console.log(city)
      return (
        <Router>
      <Navbar myCity={thfun}/>
     
<img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/84b0cc54827733.596dfccc264cc.png" alt="" id='back2'/>

      <Routes>
<Route exact path="/" element={<Empty/>}></Route>
<Route exact path="/City" element={<City key={city} loc={city} sunny={sunny}/>}></Route>
<Route exact path="Forecastgraph/" element={<Forecastgraph key={city} loc={city} arr sunny={sunny}/>}></Route>
      </Routes>

     </Router>
    )
  }

export default App