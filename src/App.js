import React, { useCallback, useState, useEffect, useMemo } from "react";
import { getMoment,findLocation } from "./utils/helpers";
//import './App.css';
//1.引入
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import WeatherCard from "./views/WeatherCard";
import WeatherSetting from "./views/WeatherSetting";
import useWeatherAPI from "./hooks/useWeatherAPI";


//定義主題
const theme = {
  light: {
    backgroundColor: "#ededed",
    foregroundColor: "#f9f9f9",
    boxShadow: "0 1px 3px 0 #999999",
    titleColor: "#212121",
    temperatureColor: "#757575",
    textColor: "#828282",
  },
  dark: {
    backgroundColor: "#1F2022",
    foregroundColor: "blue",
    boxShadow:
      "0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.7)",
    titleColor: "#f9f9fa",
    temperatureColor: "#dddddd",
    textColor: "#cccccc",
  },
};

//定義帶有styled 的component
const Container = styled.div`
  /*在 Styled Component 中可以透過 Props 取得對的顏色 */
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const AUTH = "CWB-86B7E04A-22F9-41AF-BD59-CE75D9E5658F";
const LOCATION_NAME = "臺北";
const LOCATION_NAME_FORECAST = "臺北市";



function App() {
 
 const [currentPage, setCurrentPage]=useState('WeatherCard')
  const handleCurrentPageChange=(currentPage)=>{
    setCurrentPage(currentPage)
  }

  const [currentCity,setCurrentCity]=useState(localStorage.getItem('cityName')||'臺北市')
  const handleCurrentCityChange=(currentCity)=>{
    setCurrentCity(currentCity)
  }
  const currentLocation=useMemo(()=>findLocation(currentCity),[currentCity])

  const {cityName,locationName,sunriseCityName}=currentLocation

  const [weatherElement,fetchData]=useWeatherAPI({
    locationName,
    cityName,
    authorizationkey:AUTH
  }
    

  )
  const [isClicked, setIsClick] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');



  const moment = useMemo(() => getMoment(sunriseCityName), [sunriseCityName]);

  useEffect(() => {
    setCurrentTheme(moment === 'day'||isClicked===true ? 'light' : 'dark');
  }, [moment,isClicked]);


  return (
    //把所有會用到主題配色的部分都包在 ThemeProvider 內， 並透過 theme 這個 props 傳入深色主題
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        {currentPage==='WeatherCard'&&
        (<WeatherCard cityName={cityName} weatherElement={weatherElement} moment={moment} fetchData={fetchData} handleCurrentPageChange={handleCurrentPageChange} isClicked={isClicked} setIsClick={setIsClick}/>)}
        {currentPage==='WeatherSetting'&&<WeatherSetting cityName={cityName} handleCurrentPageChange={handleCurrentPageChange} handleCurrentCityChange={handleCurrentCityChange}/>}
      </Container>
    </ThemeProvider>
  );
}

export default App;
