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
    <div>
      <Col sm={{span: 4}}>
      <div className = "headerimg">
       <img src= {(process.env.PUBLIC_URL+'/images/'+logo)}></img>
      </div>
    </Col>
   </div>
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
        <HeaderItems style = {{padding: '0px', margin: '0px'}}logo = {headerImage.logo}></HeaderItems>
      </div>
      <h1><b>MY AIRPORTS</b></h1>
      <Button style={{backgroundColor: '#6cb1c9', width: "100px", borderColor: '#6cb1c9', borderRadius: '20px', margin: '10px' }} font = "Helvetica" className = "airportbutton" onClick={()=>fetchFlightSchedule('DFW')}> <b>DFW</b></Button>
      <Button style={{backgroundColor: '#6cb1c9', width: "100px", borderColor: '#6cb1c9', borderRadius: '20px', margin: '10px' }} font = "Helvetica" className = "airportbutton" onClick={()=>fetchFlightSchedule('SFO')}> <b>SFO</b> </Button>
      <Button style={{backgroundColor: '#6cb1c9', width: "100px", borderColor: '#6cb1c9', borderRadius: '20px', margin: '10px' }} font = "Helvetica" className = "airportbutton" onClick={()=>fetchFlightSchedule('AUS')}> <b>AUS</b> </Button>
      <SearchBox></SearchBox>
    </div>
  );
}

export default App;
