import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('DIAGRAM');

export interface AddNewFieldEvent {
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
    text: string;
}

export const addNewTable = actionCreator<string>('ADD_NEW_TABLE');
export const addNewField = actionCreator<AddNewFieldEvent>('ADD_NEW_FIELD');
export const addNewEdge = actionCreator<AddNewEdgeEvent>('ADD_NEW_EDGE');
export const setFieldModal = actionCreator<boolean>('SET_FIELD_MODAL');
export const setActiveEntity = actionCreator<string>('SET_ACTIVE_ENTITY');
export const setWorkMode = actionCreator<WorkMode>('SET_WORK_MODE');
export const addQuestion = actionCreator<Question>('ADD_QUESTION');
export const setAssignmentId = actionCreator<number>('SET_ASSIGNMENT_ID');
export const setExamId = actionCreator<number>('SET_EXAM_ID');
