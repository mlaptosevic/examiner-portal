import { actionCreatorFactory } from 'typescript-fsa';

const actionCreator = actionCreatorFactory('DIAGRAM');

export const addNewTable = actionCreator<string>('ADD_NEW_TABLE');
