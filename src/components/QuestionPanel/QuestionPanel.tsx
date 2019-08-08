import React from 'react';
import { Dispatch } from 'redux';
import {
    addQuestion,
    Question,
    QuestioningState,
    setQuestionId,
    setQuestioningState
} from '../../reducers/diagramActions';
import { DiagramState } from '../../reducers/diagramReducer';
import { connect } from 'react-redux';
import { Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/url';

interface QuestionPanelProps {
    addQuestion: (Question) => void;
    questions: Array<Question>;
    questioningState: QuestioningState;
    setQuestioningState: (QuestioningState) => void;
    setQuestionId: (number) => void;
    questionId: number;
    examId: number;
}

class QuestionPanel extends React.Component<QuestionPanelProps> {
    constructor(props) {
        super(props);

        this.state = {
            questioningState: QuestioningState.WAIT
        };
    }

    async componentDidMount() {
        if (this.props.questioningState === QuestioningState.GET_QUESTION) {
            this.props.setQuestioningState(QuestioningState.WAIT);

            const response = await axios.get(`${BACKEND_URL}/v1/exam/${this.props.examId}/question`);

            if (response.status !== 200) {
                console.error("Can't load question");
                return;
            }

            console.log(response.data);
            this.props.setQuestionId(response.data.id);
            this.props.addQuestion(response.data);
        }
    }

    async componentDidUpdate(prevProps: Readonly<QuestionPanelProps>, prevState: Readonly<{}>) {
        console.log('activeated', prevProps.questioningState, this.props.questioningState);
        if (
            prevProps.questioningState !== this.props.questioningState &&
            this.props.questioningState === QuestioningState.GET_QUESTION
        ) {
            this.props.setQuestioningState(QuestioningState.WAIT);

            const response = await axios.get(`${BACKEND_URL}/v1/exam/${this.props.examId}/question`);

            if (response.status !== 200) {
                console.error("Can't load question");
                return;
            }
            this.props.setQuestionId(response.data.id);
            this.props.addQuestion(response.data);
        }
    }

    render() {
        const questionsItems = this.props.questions.map(question => (
            <ListGroup.Item key={question.id} variant="dark">
                {question.textOfQuestion}
            </ListGroup.Item>
        ));

        return (
            <div className="question-panel">
                <div className="title">Questions:</div>
                <ListGroup>{questionsItems}</ListGroup>
                <Button
                    onClick={async () => {
                        await axios.post(
                            `${BACKEND_URL}/v1/exam/${this.props.examId}/question/${this.props.questionId}`
                        );
                        this.props.setQuestioningState(QuestioningState.GET_QUESTION);
                    }}
                >
                    Answer Question
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addQuestion: (question: Question) => {
            dispatch(addQuestion(question));
        },
        setQuestioningState: (questioningState: QuestioningState) => {
            dispatch(setQuestioningState(questioningState));
        },
        setQuestionId: (questionId: number) => {
            dispatch(setQuestionId(questionId));
        }
    };
};

const mapStoreToProps = (store: DiagramState) => {
    return {
        questions: store.questions,
        questioningState: store.questioningState,
        questionId: store.questionId,
        examId: store.examId
    };
};

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(QuestionPanel);
