import React, { useState } from 'react'
import {
  Link
} from "react-router-dom";
function Navbar(props){
  const [text, settext] = useState("")
  
      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">LameWeather</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex row" id="weBox" >
              <input className="d-block mx-1 col-7 " type="search" value={text} onChange={(e)=>{
                settext(e.target.value)
                } } id='secity' placeholder="Search" aria-label="Search"/>
              <Link className="btn btn-outline-success col-4" type="submit" to="/City" data-bs-dismiss="offcanvas" aria-label="Close"
              onClick={props.myCity}>Get Weather</Link>
                        </form></div>
        </div>
      </nav>
    )
  }

export default Navbar