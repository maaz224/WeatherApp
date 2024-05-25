import React, { useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const searchLocation = (event) => {
    if (event.key === "Enter" && location.trim() !== "") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=52d05aeaba175e16165a91da30d019a3&units=imperial`;
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching the weather data:", error);
        });
      setLocation("");
    }
  };

  return (
    <div className="App">
      <Container className="search">
        <InputGroup className="mb-3">
          <Form.Control
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            placeholder="Enter Location"
            type="text"
          />
        </InputGroup>
      </Container>
      <Container className="container">
        <Row className="top text-center">
          <Col>
            <h1>{data.name}</h1>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>{data.main && <h1>{data.main.temp.toFixed()}°F</h1>}</Col>
        </Row>
        <Row className="text-center">
          <Col>
            {data.weather && (
              <p className="description">{data.weather[0].main}</p>
            )}
          </Col>
        </Row>
        {data.name && (
          <Row className="bottom">
            <Col>
              {data.main && (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              )}
              <p>Feels Like</p>
            </Col>
            <Col>
              {data.main && <p className="bold">{data.main.humidity}%</p>}
              <p>Humidity</p>
            </Col>
            <Col>
              {data.wind && (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              )}
              <p>Wind Speed</p>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}
