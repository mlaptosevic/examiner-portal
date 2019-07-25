import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <Container fluid={true} className="header">
                <Row>
                    <Col xs={4}>
                        <p className="title">ER Model Examiner</p>
                    </Col>
                    <Col xs={{ span: 4, offset: 4 }}>
                        <p>Student John Doe</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Header;
