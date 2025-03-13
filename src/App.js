import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';



const headerImage = {
  logo: 'INPLANESIGHTLOGO.PNG',
}

const API_KEY = '5e280eff54msh125ec8c51385101p131466jsne19c66db25b6';

// This is a constant for the Header Logo 
export const HeaderItems = ({logo}) => {
  return(
    <Container fluid> 
      <Col sm={{span: 4}}>
      <div className = "headerimg">
       <img src= {(process.env.PUBLIC_URL+'/images/'+logo)}></img>
      </div>
    </Col>
    </Container>
);
}


const fetchFlightSchedule = async (airportCode) => {
  console.log("Fetching flight schedule for:", airportCode);

  const url = `https://aerodatabox.p.rapidapi.com/flights/airports/iata/${airportCode}?offsetMinutes=-120&durationMinutes=720&withLeg=true&direction=Both&withCancelled=true&withCodeshared=true&withCargo=true&withPrivate=true&withLocation=false`;

  console.log("Fetching from URL:", url);

  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'aerodatabox.p.rapidapi.com'
    }
  };
  
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

export function SearchBox() {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="or search by IATA code..."
        value={searchText}
        onChange={handleInputChange}
      />
      <p>Searching for: {searchText}</p>
    </div>
  );
}


function App() {
  return (
    <div className="App">
      <div className = "headerImage">
        <HeaderItems logo = {headerImage.logo}></HeaderItems>
      </div>
      <h1>MY AIRPORTS </h1>
      <Button onClick={()=>fetchFlightSchedule('DFW')}> DFW </Button>
      <Button onClick={()=>fetchFlightSchedule('SFO')}> SFO </Button>
      <Button onClick={()=>fetchFlightSchedule('AUS')}> AUS </Button>
      <SearchBox></SearchBox>
    </div>
  );
}

export default App;
