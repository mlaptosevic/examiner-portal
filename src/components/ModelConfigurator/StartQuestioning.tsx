import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setWorkMode, WorkMode } from '../../reducers/diagramActions';
import { Button, Modal } from 'react-bootstrap';

interface StartQuestioningProps {
    setWorkMode: (WorkMode) => void;
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
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setWorkMode: (workMode: WorkMode) => {
            dispatch(setWorkMode(workMode));
        }
    };
};

export default connect(
    () => {},
    mapDispatchToProps
)(StartQuestioning);
