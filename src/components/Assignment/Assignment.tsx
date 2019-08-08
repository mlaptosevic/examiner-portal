import React from 'react';
import { Dispatch } from 'redux';
import { setAssignment } from '../../reducers/diagramActions';
import { DiagramState } from '../../reducers/diagramReducer';
import { connect } from 'react-redux';
import { Assignment as AssignmentClass } from '../../reducers/diagramActions';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/url';

interface AssignmentProps {
    assignment: AssignmentClass;
    setAssignment: (assignment: AssignmentClass) => void;
}

class Assignment extends React.Component<AssignmentProps> {
    async componentDidMount(): Promise<void> {
        const request = await axios.get(`${BACKEND_URL}/v1/assignment/student/1`);

        if (request.status !== 200) {
            console.error('We are having problem loading assignment for student');
            return;
        }

        const assignment = request.data;

        this.props.setAssignment(assignment);
    }

    render() {
        if (!this.props.assignment || !this.props.assignment.assignmentText) {
            return <div className="assignment">Assignment text</div>;
        }

        return (
            <div className="assignment">
                <div className="assignment-title">{this.props.assignment.title}</div>
                <div className="assignment-text">{this.props.assignment.assignmentText}</div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setAssignment: (assignment: AssignmentClass) => {
            dispatch(setAssignment(assignment));
        }
    };
};

const mapStateToProps = (state: DiagramState) => {
    return {
        assignment: state.assignment
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Assignment);
