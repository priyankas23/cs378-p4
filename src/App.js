import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';


const headerImage = {
  logo: 'INPLANESIGHTLOGO.PNG';
}

export const HeaderItems = ({logo}) => {
  return(
    <Container fluid> 
      <Col sm={{span: 4}}>
      <div className = "headerimg">
       <img src= {(process.env.PUBLIC_URL+"/images/"+logo)}></img>
      </div>
    </Col>
    </Container>
);
}

function App() {
  return (
    <div className="App">
      <div className = "headerImage">
        <HeaderItems logo = {headerImage.logo}></HeaderItems>
      </div>
      <h1>me: oh seventeen has all bangers except for power of love </h1>
      <h1>my playlist:fuck you (plays power of love) </h1>
    </div>
  );
}

export default App;
