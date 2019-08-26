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
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/url';
import { Diagram } from 'gojs';

interface QuestionPanelProps {
    addQuestion: (Question) => void;
    questions: Array<Question>;
    questioningState: QuestioningState;
    setQuestioningState: (QuestioningState) => void;
    setQuestionId: (number) => void;
    questionId: number;
    examId: number;
    diagram: Diagram;
}

interface QuestionPanelState {
    questioningState: QuestioningState;
    isQuestioningFinished: boolean;
}

const FINISHED = 'FINISHED';

class QuestionPanel extends React.Component<QuestionPanelProps, QuestionPanelState> {
    constructor(props) {
        super(props);

        this.state = {
            questioningState: QuestioningState.WAIT,
            isQuestioningFinished: false
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
        console.log('activated', prevProps.questioningState, this.props.questioningState);
        if (
            prevProps.questioningState !== this.props.questioningState &&
            this.props.questioningState === QuestioningState.GET_QUESTION
        ) {
            this.props.setQuestioningState(QuestioningState.WAIT);

            const response1 = await axios.get(`${BACKEND_URL}/v1/exam/${this.props.examId}/status`);

            if (response1.status !== 200) {
                console.log(`Can't load exam status`);
                return;
            }

            const examStatus = response1.data;

            if (examStatus === FINISHED) {
                this.setState({ isQuestioningFinished: true });
            }

            const response2 = await axios.get(`${BACKEND_URL}/v1/exam/${this.props.examId}/question`);

            if (response2.status !== 200) {
                console.error("Can't load question");
                return;
            }
            this.props.setQuestionId(response2.data.id);
            this.props.addQuestion(response2.data);
            this.props.diagram.model.modelData.questionId = response2.data.id;
        }
    }

    render() {
        const questionsItems = this.props.questions.map(question => (
            <ListGroup.Item key={question.id} variant="dark">
                {question.textOfQuestion}
            </ListGroup.Item>
        ));

        const resultPanelNotification = this.state.isQuestioningFinished ? <div>Questioning is finished</div> : null;

        return (
            <div className="question-panel">
                <div className="title">Questions:</div>
                <ListGroup>{questionsItems}</ListGroup>
                {resultPanelNotification}
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
        examId: store.examId,
        diagram: store.diagram
    };
};

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(QuestionPanel);
