import { Row, Col, Container } from 'react-bootstrap';
import './App.css';
import AppLogo from "../public/faucet-logo.png";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Config from "./Config";
import Home from "./components/pages/Home";
import About from './components/pages/About';

function AppHome() {


  return (
    <>
      <Header />

      <Container>

        <Row>
          <Col md={4}>
            <img src={AppLogo} />
          </Col>
          <Col md={8}>
            <Home />
          </Col>
        </Row>

        <br /><br /><br />
        <Row>
          <Col>
            <About />
          </Col>
        </Row>
      </Container>

      <Footer />

    </>
  );
}


export default AppHome;