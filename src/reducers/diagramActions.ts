import { actionCreatorFactory } from 'typescript-fsa';
import { Diagram } from 'gojs';

const actionCreator = actionCreatorFactory('DIAGRAM');

export interface FieldUpdateEvent {
    entity: string;
    field: string;
}

export interface AddNewEdgeEvent {
    from: string;
    to: string;
}

export enum WorkMode {
    WORKING,
    QUESTIONING,
    FINISHED
}

export interface Question {
    id: number;
    textOfQuestion: string;
}

export enum QuestioningState {
    WAIT,
    GET_QUESTION
}

export interface Assignment {
    id: number;
    assignmentText: string;
    title: string;
}

export const addNewTable = actionCreator<string>('ADD_NEW_TABLE');
export const addNewField = actionCreator<FieldUpdateEvent>('ADD_NEW_FIELD');
export const addNewEdge = actionCreator<AddNewEdgeEvent>('ADD_NEW_EDGE');
export const setFieldModal = actionCreator<boolean>('SET_FIELD_MODAL');
export const setActiveEntity = actionCreator<string>('SET_ACTIVE_ENTITY');
export const setWorkMode = actionCreator<WorkMode>('SET_WORK_MODE');
export const addQuestion = actionCreator<Question>('ADD_QUESTION');
export const setAssignmentId = actionCreator<number>('SET_ASSIGNMENT_ID');
export const setExamId = actionCreator<number>('SET_EXAM_ID');
export const setQuestionId = actionCreator<number>('SET_QUESTION_ID');
export const setQuestioningState = actionCreator<QuestioningState>('SET_QUESTIONING_STATUS');
export const setAssignment = actionCreator<Assignment>('SET_ASSIGNMENT');
export const setFieldUpdateToNone = actionCreator<void>('SET_FIELD_UPDATE_TO_NONE');
export const setDiagram = actionCreator<Diagram>('SET_DIAGRAM');
