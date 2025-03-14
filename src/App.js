import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { format, parseISO } from 'date-fns';




const headerImage = {
  logo: 'INPLANESIGHTLOGO.png',
}

const API_KEY = '5e280eff54msh125ec8c51385101p131466jsne19c66db25b6';

// This is a constant for the Header Logo 
export const HeaderItems = ({ logo }) => {
  return (
    <div>
      <Col sm={{ span: 4 }}>
        <div className="headerimg">
          <img src={(process.env.PUBLIC_URL + '/images/' + logo)}></img>
        </div>
      </Col>
    </div>
  );
}


const fetchAirportName = async(airportCode, setAirportName) => {
  const url = `https://aerodatabox.p.rapidapi.com/airports/iata/${airportCode}`;
  const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '5e280eff54msh125ec8c51385101p131466jsne19c66db25b6',
		'x-rapidapi-host': 'aerodatabox.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
  setAirportName(result.fullName || "");
} catch (error) {
	console.error(error);
  setAirportName([])
}
};

const fetchFlightSchedule = async (airportCode, setFlights, flights) => {
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
    const result = await response.json();
    console.log(result);
    const scheduledFlights = (result.departures || []).filter(flight =>
      flight.status === "Scheduled" || flight.status === "Expected"
    );
    console.log("Filtered Scheduled Flights:", scheduledFlights); 
    setFlights(scheduledFlights || []); 
    console.log(flights)
  } catch (error) {
    console.error(error);
    setFlights([]); 
  }
};

export function SearchBox({ onSearch, setFlights, flights, setCurrentAirport, setAirportName}) {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchText.toUpperCase(), setFlights, flights, setAirportName);
      setCurrentAirport(searchText.toUpperCase())
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="OR SEARCH BY IATA CODE..."
        value={searchText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <p><b>SEARCHING FOR: {searchText.toUpperCase()}</b></p>
    </div>
  );
}

const FlightCard = ({ flight }) => {
  return (
    <Col sm={12}>
    <Card style={{ display: 'flex', alignItems: 'center', width: '100%', margin: '15px', marginBottom: '10px', borderRadius: '25px', borderWidth: '4px'}}>
      <Card.Body>
        <Card.Title style = {{fontSize: '32px', color:'#6cb1c9'}}><b>Flight {flight.number}</b></Card.Title>
        <Card.Subtitle style = {{fontSize: '24px', color: 'darkgray'}}><b><em>{flight.airline.name}</em></b></Card.Subtitle>
        <Card.Text>
          <b>Terminal:</b> {flight.departure.terminal || "Unknown"} <br />
          <b>Aircraft:</b> {flight.aircraft?.model || "Unknown"} <br />
          <b>Departure:</b> {format(parseISO(flight.departure.scheduledTime.local), 'MMMM dd, yyyy h:mm a')} <br />
          <b>Arrival:</b> {flight.arrival.airport?.name + " (" + flight.arrival.airport?.iata + ")" || "Unknown"}
        </Card.Text>
      </Card.Body>
    </Card>
    </Col>
  );
};

const handleSearch = (airportCode, setFlights, flights, setAirportName ) => {
  fetchFlightSchedule(airportCode, setFlights, flights); // Call the fetchFlightSchedule function
  fetchAirportName(airportCode, setAirportName); // Call the fetchAirportName function
};

function App() {
  const [currentAirport, setCurrentAirport] = useState('');
  const [airportName, setAirportName] = useState('');
  const [flights, setFlights] = useState([]);
  return (
    <div className="App">
      <div className="headerImage">
        <HeaderItems style={{ padding: '0px', margin: '0px' }} logo={headerImage.logo}></HeaderItems>
      </div>
      <h1><b>MY AIRPORTS</b></h1>
      <div className="buttons">
        <Button style={{ backgroundColor: '#6cb1c9', width: "100px", fontSize: "25px", borderColor: '#6cb1c9', borderRadius: '20px', margin: '10px' }} font="Helvetica" className="airportbutton" onClick={() => {
          fetchFlightSchedule('DFW', setFlights, flights);
          fetchAirportName('DFW', setAirportName);
          setCurrentAirport('DFW');
        }}> <b>DFW</b></Button>
        <Button style={{ backgroundColor: '#6cb1c9', width: "100px", fontSize: "25px", borderColor: '#6cb1c9', borderRadius: '20px', margin: '10px' }} font="Helvetica" className="airportbutton" onClick={() => {
          fetchFlightSchedule('SFO', setFlights, flights);
          fetchAirportName('SFO', setAirportName);
          setCurrentAirport('SFO');
        }}> <b>SFO</b> </Button>
        <Button style={{ backgroundColor: '#6cb1c9', width: "100px", fontSize: "25px", borderColor: '#6cb1c9', borderRadius: '20px', margin: '10px' }} font="Helvetica" className="airportbutton" onClick={() => {
          fetchFlightSchedule('AUS', setFlights, flights);
          fetchAirportName('AUS', setAirportName);
          setCurrentAirport('AUS');
        }}> <b>AUS</b> </Button>
      </div>
      <SearchBox onSearch={handleSearch} setFlights={setFlights} flights={flights} setCurrentAirport={setCurrentAirport} setAirportName = {setAirportName}></SearchBox>
      <Col sm={12} className="searchResults">
        <h2><b>Showing Flights for {airportName} ({currentAirport})</b></h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {flights.length > 0 ? (
            flights.map((flight, index) => <FlightCard key={index} flight={flight} />)
          ) : (
            <p>No flights available.</p>
          )}
        </div>
      </Col>
    </div>
  );
}

export default App;
