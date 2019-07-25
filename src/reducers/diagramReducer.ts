import { BaseNodeModel, DiagramModel, LinkModel } from 'react-gojs';
import * as _ from 'lodash';
import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { addNewTable } from './diagramActions';

export interface NodeModel extends BaseNodeModel {
    tableName: string;
    fields: Array<string>;
}

export interface DiagramState {
    model: DiagramModel<NodeModel, LinkModel>;
}

const addNewTableHandler = (state: DiagramState, payload: string): DiagramState => {
    const newNodes = _.cloneDeep(state.model.nodeDataArray);
    newNodes.push({ key: payload, tableName: payload, fields: [] });

    return {
        ...state,
        model: {
            ...state.model,
            nodeDataArray: newNodes
        }
    };
};

export const diagramReducer: Reducer<DiagramState> = reducerWithInitialState<DiagramState>({
    model: {
        nodeDataArray: [],
        linkDataArray: []
    }
})
    .case(addNewTable, addNewTableHandler)
    .build();
