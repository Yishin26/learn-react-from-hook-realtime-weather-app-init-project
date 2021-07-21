import React from "react";
//import './App.css';
//1.引入
import styled from "@emotion/styled";

//2.定義帶有styled 的component
const Container = styled.div`
  background-color: #ededed;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 0 #999999;
  background-color: #f9f9f9; ;
`;

function App() {
  return (
    <Container>
      <WeatherCard>
        <h1>Weather</h1>
      </WeatherCard>
    </Container>
  );
}

export default App;
