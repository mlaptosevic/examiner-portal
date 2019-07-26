import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ExamPage from './pages/ExamPage';

class App extends React.Component {
    render() {
        return (
            <Container fluid={true}>
                <Row>
                    <Header />
                </Row>
                <Row className="main-content">
                    <ExamPage />
                </Row>
                <Row>
                    <Footer />
                </Row>
            </Container>
        );
    }
}

export default App;
