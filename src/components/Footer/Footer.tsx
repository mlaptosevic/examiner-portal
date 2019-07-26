import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Footer = props => {
    return (
        <Container fluid={true} className="footer">
            <Row>
                <p className="title">ER Model Examiner</p>
            </Row>
            <Row>Project is still in development phase, thank you for testing</Row>
        </Container>
    );
};

export default Footer;
