import React from 'react'
import Weather from './components/Weather'
import logo from './assets/Creative.jpg'

const App = () => {
  return (
    <div className='app'>
      
      <Weather />
      <div className='intro-app'>
<h2>Weather By Hoang Giap  </h2>
      <span><img src={logo}alt="" /></span>
      </div>
    </div>
   
  )
}

export default App
