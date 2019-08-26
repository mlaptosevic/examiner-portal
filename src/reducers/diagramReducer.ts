import { BaseNodeModel, DiagramModel, LinkModel } from 'react-gojs';
import * as _ from 'lodash';
import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
    addNewEdge,
    AddNewEdgeEvent,
    addNewField,
    FieldUpdateEvent,
    addNewTable,
    addQuestion,
    Assignment,
    Question,
    QuestioningState,
    setActiveEntity,
    setAssignment,
    setAssignmentId,
    setExamId,
    setFieldModal,
    setQuestionId,
    setQuestioningState,
    setWorkMode,
    WorkMode,
    setFieldUpdateToNone,
    setDiagram
} from './diagramActions';
import { Diagram } from 'gojs';

export interface NodeModel extends BaseNodeModel {
    entity: string;
    fields: Array<string>;
}

export const NO_ACTIVE_ENTITY = '';
export const NO_EXAM = -1;
export const NO_QUESTION = -1;
export const NO_FIELD_UPDATE_EVENT = {} as FieldUpdateEvent;

export interface DiagramState {
    model: DiagramModel<NodeModel, LinkModel>;
    shouldShowFieldModal: boolean;
    activeEntity: string;
    workMode: WorkMode;
    questions: Array<Question>;
    assignmentId: number;
    examId: number;
    questionId: number;
    questioningState: QuestioningState;
    assignment: Assignment;
    fieldUpdate: FieldUpdateEvent;
    diagram: Diagram;
}

const addNewTableHandler = (state: DiagramState, payload: string): DiagramState => {
    const newNodes = _.cloneDeep(state.model.nodeDataArray);
    newNodes.push({ key: payload, entity: payload, fields: [] });

    return {
        ...state,
        model: {
            ...state.model,
            nodeDataArray: newNodes
        }
    };
};

const addNewFieldHandler = (state: DiagramState, payload: FieldUpdateEvent) => {
    const newNodes = Array.from(state.model.nodeDataArray);
    newNodes.forEach(entity => {
        if (entity.entity === payload.entity) {
            entity.fields.push(payload.field);
        }
    });

    return {
        ...state,
        fieldUpdate: payload,
        model: {
            ...state.model,
            nodeDataArray: newNodes
        }
    };
};

const setFieldUpdateToNoneHandler = (state: DiagramState) => {
    return {
        ...state,
        fieldUpdate: NO_FIELD_UPDATE_EVENT
    };
};

const addNewEdgeHandler = (state: DiagramState, payload: AddNewEdgeEvent) => {
    const newLinks = _.cloneDeep(state.model.linkDataArray);

    newLinks.push(payload);

    return {
        ...state,
        model: {
            ...state.model,
            linkDataArray: newLinks
        }
    };
};

const setFieldModalHandler = (state: DiagramState, payload: boolean) => {
    return {
        ...state,
        shouldShowFieldModal: payload
    };
};

const setActiveEntityHandler = (state: DiagramState, payload: string) => {
    return {
        ...state,
        activeEntity: payload
    };
};

const setWorkModeHandler = (state: DiagramState, payload: WorkMode) => {
    return {
        ...state,
        workMode: payload
    };
};

const addQuestionHandler = (state: DiagramState, payload: Question) => {
    const newQuestions = _.cloneDeep(state.questions);

    newQuestions.push(payload);

    return {
        ...state,
        questions: newQuestions
    };
};

const setAssignmentIdHandler = (state: DiagramState, payload: number) => {
    return {
        ...state,
        assignmentId: payload
    };
};

const setQuestionIdHandler = (state: DiagramState, payload: number) => {
    return {
        ...state,
        questionId: payload
    };
};

const setExamIdHandler = (state: DiagramState, payload: number) => {
    return {
        ...state,
        examId: payload
    };
};

const setQuestioningStateHandler = (state: DiagramState, payload: QuestioningState) => {
    return {
        ...state,
        questioningState: payload
    };
};

const setAssignmentHandler = (state: DiagramState, payload: Assignment) => {
    return {
        ...state,
        assignment: payload
    };
};

const setDiagramHandler = (state: DiagramState, payload: Diagram) => {
    return {
        ...state,
        diagram: payload
    };
};

export const diagramReducer: Reducer<DiagramState> = reducerWithInitialState<DiagramState>({
    model: {
        nodeDataArray: [],
        linkDataArray: []
    },
    shouldShowFieldModal: false,
    activeEntity: NO_ACTIVE_ENTITY,
    workMode: WorkMode.WORKING,
    questions: [],
    // TODO: change later
    assignmentId: 2,
    examId: NO_EXAM,
    questioningState: QuestioningState.WAIT,
    questionId: NO_QUESTION,
    assignment: {} as Assignment,
    fieldUpdate: NO_FIELD_UPDATE_EVENT,
    diagram: {} as Diagram
})
    .case(addNewTable, addNewTableHandler)
    .case(addNewField, addNewFieldHandler)
    .case(addNewEdge, addNewEdgeHandler)
    .case(setFieldModal, setFieldModalHandler)
    .case(setActiveEntity, setActiveEntityHandler)
    .case(setWorkMode, setWorkModeHandler)
    .case(addQuestion, addQuestionHandler)
    .case(setAssignmentId, setAssignmentIdHandler)
    .case(setExamId, setExamIdHandler)
    .case(setQuestioningState, setQuestioningStateHandler)
    .case(setQuestionId, setQuestionIdHandler)
    .case(setAssignment, setAssignmentHandler)
    .case(setFieldUpdateToNone, setFieldUpdateToNoneHandler)
    .case(setDiagram, setDiagramHandler)
    .build();
