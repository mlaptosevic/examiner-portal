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

export const addNewTable = actionCreator<string>('ADD_NEW_TABLE');
export const addNewField = actionCreator<AddNewFieldEvent>('ADD_NEW_FIELD');
export const addNewEdge = actionCreator<AddNewEdgeEvent>('ADD_NEW_EDGE');
export const setFieldModal = actionCreator<boolean>('SET_FIELD_MODAL');
export const setActiveEntity = actionCreator<string>('SET_ACTIVE_ENTITY');
export const setWorkMode = actionCreator<WorkMode>('SET_WORK_MODE');
