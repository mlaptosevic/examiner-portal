import React from 'react';
import { Container, Row } from 'react-bootstrap';

const Footer = props => {
    return (
        <Container fluid={true} className="footer">
            <Row>
                <p className="title">ER Model Examiner</p>
            </Row>
            <Row>Questions at mail: mlaptosevic@gmail.com</Row>
        </Container>
    );
};

export default Footer;
