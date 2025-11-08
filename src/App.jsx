import React from 'react'
import Weather from './components/Weather'
import logo from './assets/boy.png'

const App = () => {
  return (
    <div className='app'>
      
      <Weather />
      <h2>Weather By Hoang Giap <span><img src={logo}alt="" /></span> </h2>
      
    </div>
   
  )
}

export default App
