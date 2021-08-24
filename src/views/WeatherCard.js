import React from 'react';
import styled from "@emotion/styled";
import dayjs from "dayjs";

// 載入圖示
//import { ReactComponent as DayCloudyIcon } from "./images/day-cloudy.svg";
import WeatherIcon from '../components/WeatherIcon'
import { ReactComponent as AirFlowIcon } from "../images/airFlow.svg";
import { ReactComponent as RainIcon } from "../images/rain.svg";
import { ReactComponent as RefreshIcon } from "../images/refresh.svg";
import { ReactComponent as LoadingIcon } from "../images/loading.svg";
import { ReactComponent as CogIcon } from "../images/cog.svg"

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
  cursor: pointer;
`;

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space - between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

// const DayCloudy = styled(DayCloudyIcon)`
//   flex-basis: 30%;
// `;

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? "1.5s" : "0s")};
  }
`;

const Cog = styled(CogIcon)`
  position:absolute;
  top:30px;
  right:-30px;
  height:15px;
  cursor:pointer;
`;

const WeatherCard = ({ cityName, weatherElement, moment, fetchData, setIsClick, isClicked, handleCurrentPageChange }) => {

  //解構賦值
  const {
    weatherCode,
    observationTime,
 //locationName,
    description,
    comfortability,
    windSpeed,
    temperature,
    rainPossibility,
    isLoading,
  } = weatherElement;


  return (<WeatherCardWrapper onClick={() => setIsClick(!isClicked)}>
    <Cog onClick={() => handleCurrentPageChange('WeatherSetting')} />
    <Location>{cityName}</Location>
    <Description>{description} - {comfortability}</Description>
    <CurrentWeather>
      <Temperature>
        {Math.round(temperature)} <Celsius>°C</Celsius>
      </Temperature>
      {/*<DayCloudy />*/}
      <WeatherIcon weatherCode={weatherCode} moment={moment} />
    </CurrentWeather>
    <AirFlow>
      <AirFlowIcon /> {windSpeed} m/h
    </AirFlow>
    <Rain>
      <RainIcon /> {rainPossibility} %
    </Rain>
    {/** isLoading 資料狀態透過 props 帶入 <Refresh> 這個 styled components */}
    <Refresh onClick={fetchData} isLoading={isLoading}>
      {/* JSX 中預設的空格最後在網頁 呈現時都會被過濾掉，因此如果你希望最後在頁面上元件與元件間是留有 空格的，就可以透過帶入「空字串」的方式來加入空格 */}
      最後觀測時間：
      {new Intl.DateTimeFormat("zh-TW", {
        hour: "numeric",
        minute: "numeric",
      }).format(dayjs(observationTime))}{" "}
      {isLoading ? <LoadingIcon /> : <RefreshIcon />}
    </Refresh>
  </WeatherCardWrapper>);

}

export default WeatherCard;