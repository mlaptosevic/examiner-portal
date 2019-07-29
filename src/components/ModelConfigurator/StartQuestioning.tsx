import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { QuestioningState, setExamId, setQuestioningState, setWorkMode, WorkMode } from '../../reducers/diagramActions';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

interface StartQuestioningProps {
    setWorkMode: (WorkMode) => void;
    setExamId: (number) => void;
    setQuestioningState: (QuestioningState) => void;
}

interface StartQuestioningState {
    shouldShowModal: boolean;
}

class StartQuestioning extends React.Component<StartQuestioningProps, StartQuestioningState> {
    constructor(props) {
        super(props);

        this.state = {
            shouldShowModal: false
        };
    }

    render() {
        return (
            <div>
                <Button
                    variant="info"
                    size="lg"
                    style={{ margin: '10px' }}
                    onClick={() => this.setState({ shouldShowModal: true })}
                >
                    Send answer and start questioning
                </Button>

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.shouldShowModal}
                >
                    <Modal.Body>Are you sure, you will not be able to edit your work anymore!</Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="success"
                            onClick={() => {
                                this.setState({ shouldShowModal: false });
                                this.props.setWorkMode(WorkMode.QUESTIONING);
                                this.startQuestioning();
                            }}
                        >
                            Yes
                        </Button>
                        <Button variant="danger" onClick={() => this.setState({ shouldShowModal: false })}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    private startQuestioning = async () => {
        const response = await axios.post('http://localhost:8080/v1/exam/new/student/1/assignment/1');

        if (response.status !== 200) {
            console.error("Can't create new exam");
            return;
        }

        this.props.setExamId(response.data);
        this.props.setQuestioningState(QuestioningState.GET_QUESTION);
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setWorkMode: (workMode: WorkMode) => {
            dispatch(setWorkMode(workMode));
        },
        setExamId: (examId: number) => {
            dispatch(setExamId(examId));
        },
        setQuestioningState: (questioningState: QuestioningState) => {
            dispatch(setQuestioningState(questioningState));
        }
    };
};

export default connect(
    () => {},
    mapDispatchToProps
)(StartQuestioning);
