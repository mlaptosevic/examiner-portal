import React from 'react';
import { DiagramState } from '../../reducers/diagramReducer';
import { connect } from 'react-redux';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/url';

interface ResultPanelProps {
    examId: number;
}

interface ResultPanelState {
    questions: { id: number; textOfQuestion: string; questionStatus: string }[];
}

class ResultPanel extends React.Component<ResultPanelProps, ResultPanelState> {
    constructor(props) {
        super(props);

        this.state = {
            questions: []
        };
    }

    componentDidMount = async () => {
        const response = await axios.get(`${BACKEND_URL}/v1/exam/${this.props.examId}/questions`);

        if (response.status !== 200) {
            console.error('Cannot load questions and show score');
            return;
        }

        const questions = response.data;

        this.setState({ questions });
    };

    render() {
        const correnctAnswers = this.state.questions.filter(question => question.questionStatus === 'CORRECT');

        return (
            <div className="result-panel">
                Number of correct answers are {correnctAnswers.length} / {this.state.questions.length}
            </div>
        );
    }
}

const mapStoreToProps = (store: DiagramState) => {
    return {
        examId: store.examId
    };
};

export default connect(mapStoreToProps)(ResultPanel);
