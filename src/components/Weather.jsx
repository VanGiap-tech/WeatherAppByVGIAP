import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'

import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import clearnight_icon from '../assets/clear-night.png'
import cloud_icon from '../assets/cloud.png'
import cloudnight_icon from '../assets/clear-night1.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import rainnight_icon from '../assets/rain-night.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData]= useState(false);
    
    const allIcons={
        "01d":clear_icon,
        "01n":cloudnight_icon,
        "02d":cloud_icon,
        "02n":cloudnight_icon,
        "03d":cloud_icon,
        "03n":cloudnight_icon,
        "04d":drizzle_icon,
        "04n":rainnight_icon,
        "09d":rain_icon,
        "09n":rainnight_icon,
        "10d":rain_icon,
        "10n":rainnight_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }
const removeVietnameseMarks = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    // Loại bỏ dấu và ký tự đặc biệt khác nếu cần
    str = str.replace(/\s+/g, ' ').trim(); // Xóa khoảng trắng thừa
    
    return str;
};
    const search=async(city)=>{
        if(city===""){
            alert("Enter City name");
            return;
        }
        try{
            const cityWithoutMarks = removeVietnameseMarks(city);
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityWithoutMarks}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const respone = await fetch(url);
            const data =await respone.json();
            if(!respone.ok){
                alert(data.message);
                inputRef.current.value = "";
                return;
            }
            console.log(data);
            const icon=allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })
            // Xóa ô tìm kiếm sau khi tìm thành công
            inputRef.current.value = "";
        }
        catch(error)
        {
            setWeatherData(false);
            console.error("error !")
        }
    }

const handleKeyDown=(e)=>{
    if(e.key==="Enter"){
        search(inputRef.current.value);
    }
}
useEffect(()=>{
search("Ha noi");
},[])

  return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='search' onKeyDown={handleKeyDown} />
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
        </div>
        {weatherData?<>
         <img src={weatherData?.icon || clear_icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span>Humidity</span>
                </div>
            </div>
             <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div>
        
        </>:<></>}
       
    </div>
  )
}

export default Weather
