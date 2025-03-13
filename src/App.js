import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';



const headerImage = {
  logo: 'INPLANESIGHTLOGO.PNG',
}

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


export function SearchBox() {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
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
      <Button> DFW </Button>
      <Button> SFO </Button>
      <Button> AUS </Button>
      <SearchBox></SearchBox>
    </div>
  );
}

export default App;
