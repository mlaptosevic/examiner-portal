import React from 'react';
import { Dispatch } from 'redux';
import { addQuestion, Question } from '../../reducers/diagramActions';
import { DiagramState } from '../../reducers/diagramReducer';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

interface QuestionPanelProps {
    addQuestion: (Question) => void;
    questions: Array<Question>;
}

class QuestionPanel extends React.Component<QuestionPanelProps> {
    render() {
        const questionsItems = this.props.questions.map(question => (
            <ListGroup.Item key={question.id} variant="dark">
                {question.text}
            </ListGroup.Item>
        ));

        return (
            <div className="question-panel">
                <div className="title">Questions:</div>
                <ListGroup>{questionsItems}</ListGroup>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addQuestion: (question: Question) => {
            dispatch(addQuestion(question));
        }
    };
};

const mapStoreToProps = (store: DiagramState) => {
    return {
        questions: store.questions
    };
};

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(QuestionPanel);
