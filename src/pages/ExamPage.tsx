import React from 'react';
import { DiagramState } from '../reducers/diagramReducer';
import { connect } from 'react-redux';
import { WorkMode } from '../reducers/diagramActions';
import ModelConfigurator from '../components/ModelConfigurator/ModelConfigurator';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import Assignment from '../components/Assignment/Assignment';
import Diagram from '../components/Diagram/Diagram';
import QuestionPanel from '../components/QuestionPanel/QuestionPanel';
import ResultPanel from '../components/ResultPanel/ResultPanel';
import HelpPanel from '../components/HelpPanel/HelpPanel';

interface ExamPageProps {
    workMode: WorkMode;
}

class ExamPage extends React.Component<ExamPageProps> {
    render() {
        const workingMode = (
            <Tabs defaultActiveKey="model-configurator" id="uncontrolled-tab-example">
                <Tab eventKey="model-configurator" title="Model Configurator">
                    <ModelConfigurator />
                </Tab>
                <Tab eventKey="help-panel" title="Ask a question">
                    <HelpPanel />
                </Tab>
            </Tabs>
        );

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
                        {this.props.workMode === WorkMode.WORKING && workingMode}
                        {this.props.workMode === WorkMode.QUESTIONING && <QuestionPanel />}
                        {this.props.workMode === WorkMode.FINISHED && <ResultPanel />}
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
