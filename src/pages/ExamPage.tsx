import React from 'react';
import { DiagramState } from '../reducers/diagramReducer';
import { connect } from 'react-redux';
import { WorkMode } from '../reducers/diagramActions';
import ModelConfigurator from '../components/ModelConfigurator/ModelConfigurator';
import { Col, Container, Row } from 'react-bootstrap';
import Assignment from '../components/Assignment/Assignment';
import Diagram from '../components/Diagram/Diagram';

interface ExamPageProps {
    workMode: WorkMode;
}

class ExamPage extends React.Component<ExamPageProps> {
    render() {
        // let pageBody = null;
        //
        // switch (this.props.workMode) {
        //     case WorkMode.WORKING:
        //         pageBody = ModelConfigurator;
        //         break;
        //         case WorkMode.QUESTIONING:
        //             pageBody = ModelConfigurator;
        //             break;
        //     case WorkMode.FINISHED:
        //         pageBody = ModelConfigurator;
        //         break;
        // }

        return (
            <Container fluid={true}>
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
            </Container>
        );
    }
}

const mapStateToProps = (state: DiagramState) => {
    return {
        workMode: state.workMode
    };
};

export default connect(mapStateToProps)(ExamPage);
