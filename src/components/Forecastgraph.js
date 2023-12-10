import React, { Component } from 'react'
import { AreaChart, Area, CartesianGrid, XAxis, YAxis,Tooltip, Legend,ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
export class Forecastgraph extends Component {
  constructor(props){
    super(props)
     let data = []
  this.state={
    data:data,
    load:false
  }}
async componentDidMount(){
    this.fetchForecast()
  }
  async fetchForecast(){
    console.log(this.state.data)
   let url=`https://api.openweathermap.org/data/2.5/forecast?q=${this.props.loc}&units=metric&appid=a2af3cc5b2c23b53f5c256f011eb3494`
  let data1 = await fetch(url)
  let response=await data1.json()
  console.log(response)
  console.log(response.list)
    response.list.map((ele)=>{
      if(this.state.data.some(ele => ele.name === "ele")){
        console.log("TRUE");
    } else{
      this.state.data.push({name: ele.dt_txt,Temp:ele.main.temp})
      console.log("FALSE");
    }

    })
  this.setState({
    forecast:response.list,
    spara:response,
    data:this.state.data,
    load:true
  })
}
render() {
  return (
    <>

    <div className='p-4 m-3' id="cont_ret">
<Link className='btn previous round
' id="retbtn" to={'/City'} >&#8249;</Link>
    </div>
<span className='container card' style={{display:'block',fontFamily:`Papyrus, fantasy`, textAlign:"center", fontSize:"30px", padding:"5px",}} >Forecast after each 3hours</span>
    <ResponsiveContainer width="90%" height="50%" style={{backgroundColor:"black"}}>
      <div>
  {this.state.load?<AreaChart
    className='graph container my-5'
          width={1200}
          height={500}
          data={this.state.data}
          margin={{
            top: 5,
            right: 0,
            left: 60,
            bottom: 5,
          }} >
           <defs>
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset="35%" stopColor="orange" stopOpacity={.59}/>
      <stop offset="95%" stopColor="Blue" stopOpacity={.49}/>
    </linearGradient>
      </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" minTickGap={15} width={1200} tickSize={2} />
          <YAxis />
          <Tooltip />
          <Legend />
          
          <Area type="monotone" dataKey="Temp" stroke="#8884d8" fillOpacity={2} fill="url(#colorUv)" />
        </AreaChart>:"false"}    
    </div>
    </ResponsiveContainer>
</>
)}
}
export default Forecastgraph