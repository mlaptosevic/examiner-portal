import React from 'react';
import Diagram from './components/Diagram/Diagram';
import ModelConfigurator from './components/ModelConfigurator/ModelConfigurator';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Assignment from './components/Assignment/Assignment';

class App extends React.Component {
    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Header />
                </Row>
                <Row className="main-content">
                    <Col>
                        <Assignment />
                    </Col>
                    <Col>
                        <Diagram />
                    </Col>
                    <Col>
                        <ModelConfigurator />
                    </Col>
                </Row>
                <Row>
                    <Footer />
                </Row>
            </Container>
        );
    }
}

export default App;
