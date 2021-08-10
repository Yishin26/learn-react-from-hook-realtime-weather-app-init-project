import React, { useState, useEffect } from "react";
//import './App.css';
//1.引入
import styled from "@emotion/styled";
import { ThemeProvider } from "@emotion/react";
import dayjs from "dayjs";

// 載入圖示
import { ReactComponent as DayCloudyIcon } from "./images/day-cloudy.svg";
import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as RefreshIcon } from "./images/refresh.svg";
import { ReactComponent as LoadingIcon } from "./images/loading.svg";

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
const WeatherCard = styled.div`
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

const AUTH = "CWB-86B7E04A-22F9-41AF-BD59-CE75D9E5658F";
const LOCATION_NAME = "臺北";
const LOCATION_NAME_FORECAST = "臺北市";



function App() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [weatherElement, setWeatherElement] = useState({
    locationName: " 臺北市 ",
    description: "",
    windSpeed: 0,
    temperature: 0,
    rainPossibility: 0,
    observationTime: new Date(),
    comfortability: '舒適悶熱',
    weatherCode: 0,
    isLoading: true
  });
  const [isClicked, setIsClick] = useState(false);

  const fetchCurrentWeather = () => {
    //取得前一次的資料狀態
    setWeatherElement((prevState) => ({
      ...prevState,

      isLoading: true,

    }));
    //每次 setSomething 時都是 用新的資料覆蓋舊的」，所以這裡如果直接用： setCurrentWeather({ isLoading: true }); 那麼 整個 currentWeather 的 資料 狀態 都會 被 覆蓋 掉， 變成 只剩 下 { isLoading: true }。
    //在此加上return 直接把fetch API回傳的值回傳回去
    return fetch(
      `http://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=${AUTH}&locationName=${LOCATION_NAME}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //STEP 1：定義 `locationData` 把回傳的資料中會用到的部分取出來
        const locationData = data.records.location[0];
        //STEP 2：過濾資料

        const reducer = (neededElements, item) => {
          if (["WDSD", "TEMP"].includes(item.elementName)) {
            neededElements[item.elementName] = item.elementValue;
          }
          return neededElements;
        };
        const weatherElements = locationData.weatherElement.reduce(reducer, {});

        //最後把取得的資料回傳回去
        return {
          observationTime: locationData.time.obsTime,
          locationName: locationData.locationName,
          temperature: weatherElements.TEMP,
          windSpeed: weatherElements.WDSD,
          //description: " 多雲時晴 ",
          //rainPossibility: 60,
          isLoading: false,
        }

      });
  };


  const fetchWeatherForecast = () => {
    //取得前一次的資料狀態
    setWeatherElement((prevState) => ({
      ...prevState,
      isLoading: true,

    }));
    return fetch(
      `http://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${AUTH}&locationName=${LOCATION_NAME_FORECAST}`
    )
      .then((response) => response.json())
      .then((data) => {
        // 取出某縣市的預報資料 
        const locationData = data.records.location[0];
        console.log(data)

        const weatherElements = locationData.weatherElement.reduce((neededElements, item) => {
          // 只保留需要用到的「天氣現象」、「降雨機率」和「舒適度」 
          if (['Wx', 'PoP', 'CI'].includes(item.elementName)) {
            // 這支 API 會回傳未來 36 小時的資料，這裡只需要取出最近 12 小時 的資料，因此使用 item.time[0] 
            neededElements[item.elementName] = item.time[0].parameter;
          }
          return neededElements;
        }, {});

        return {
          description: weatherElements.Wx.parameterName,
          weatherCode: weatherElements.Wx.parameterValue,
          rainPossibility: weatherElements.PoP.parameterName,
          comfortability: weatherElements.CI.parameterName,
        }



      });


  }






  useEffect(() => {
  //在useEffect 中定義async function 取名為fetchData

    //拉取之前給予loading狀態
    setWeatherElement((prevState)=> ({
      ...prevState,
      isLoading:true,
    }));
    const fetchData = async () => {
      const data = await Promise.all([fetchCurrentWeather(),fetchWeatherForecast()])
      // console.log(data)
      const [currentWeather,weatherForecast]=data;
      
      // 放入取得的資料，透過物件的解構賦值
      setWeatherElement({
        ...currentWeather,
        ...weatherForecast,
        isLoading:false,
      })
    
    };
    fetchData();
    setCurrentTheme(isClicked === false ? "light" : "dark");

    }, [isClicked]);

  //解構賦值
  const {
    observationTime,
    locationName,
    description,
    comfortability,
    windSpeed,
    temperature,
    rainPossibility,
    isLoading,
  } = weatherElement;

  return (
    //把所有會用到主題配色的部分都包在 ThemeProvider 內， 並透過 theme 這個 props 傳入深色主題
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <WeatherCard onClick={() => setIsClick(!isClicked)}>
          <Location>{locationName}</Location>
          <Description>{description} - {comfortability}</Description>
          <CurrentWeather>
            <Temperature>
              {Math.round(temperature)} <Celsius>°C</Celsius>
            </Temperature>
            <DayCloudy />
          </CurrentWeather>
          <AirFlow>
            <AirFlowIcon /> {windSpeed} m/h
          </AirFlow>
          <Rain>
            <RainIcon /> {rainPossibility} %
          </Rain>
          {/** isLoading 資料狀態透過 props 帶入 <Refresh> 這個 styled components */}
          <Refresh onClick={() => {
            fetchCurrentWeather();
            fetchWeatherForecast();
          }} isLoading={isLoading}>
            {/* JSX 中預設的空格最後在網頁 呈現時都會被過濾掉，因此如果你希望最後在頁面上元件與元件間是留有 空格的，就可以透過帶入「空字串」的方式來加入空格 */}
            最後觀測時間：
            {new Intl.DateTimeFormat("zh-TW", {
              hour: "numeric",
              minute: "numeric",
            }).format(dayjs(observationTime))}{" "}
            {isLoading ? <LoadingIcon /> : <RefreshIcon />}
          </Refresh>
        </WeatherCard>
      </Container>
    </ThemeProvider>
  );
}

export default App;
