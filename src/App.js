import React, { useState,useEffect } from "react";
//import './App.css';
//1.引入
import styled from "@emotion/styled";
import { useTheme, ThemeProvider, withTheme } from "@emotion/react"; 

// 載入圖示
import { ReactComponent as DayCloudyIcon } from "./images/day-cloudy.svg";
import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as RefreshIcon } from "./images/refresh.svg";


//定義主題
const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282',
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: 'blue',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.7)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc',
  },
};



//定義帶有styled 的component
const Container = styled.div`
 /*在 Styled Component 中可以透過 Props 取得對的顏色 */
  background-color:  ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor}; 
  box-sizing: border-box;
  padding: 30px 15px;
  cursor:pointer;
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

const DayCloudy = styled(DayCloudyIcon)`
  flex-basis: 30%;
`;

const Refresh = styled.div`
position: absolute;
right: 15px;
bottom: 15px;
font-size: 12px;
display: inline-flex;
align-items: flex-end;
color: ${({ theme }) => theme.textColor};
svg {
  margin-left: 10px;
  width: 15px;
  height: 15px;
  cursor: pointer;
}
`;

function App() {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [isClicked, setIsClick] = useState(false);

  useEffect(() => {
    setCurrentTheme(isClicked === false ? 'light' : 'dark');
  }, [isClicked]);

  return (
    
//把所有會用到主題配色的部分都包在 ThemeProvider 內， 並透過 theme 這個 props 傳入深色主題
    <ThemeProvider theme={theme[currentTheme]} > 
    <Container >
      <WeatherCard onClick={()=>setIsClick(!isClicked)}>
        <Location>台北市</Location>
        <Description>多雲時晴</Description>
        <CurrentWeather>
          <Temperature>
            23 <Celsius>°C</Celsius>
          </Temperature>
          <DayCloudy />
        </CurrentWeather>
        <AirFlow>
          <AirFlowIcon /> 23 m/h
        </AirFlow>
        <Rain>
          <RainIcon /> 48%
        </Rain>
        <Refresh>
          最後觀測時間：上午 12:03 <RefreshIcon />
        </Refresh>
      </WeatherCard>
    </Container>
    </ThemeProvider > 
  );
}

export default App;
