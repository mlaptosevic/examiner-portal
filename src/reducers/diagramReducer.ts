import { BaseNodeModel, DiagramModel, LinkModel } from 'react-gojs';
import * as _ from 'lodash';
import { Reducer } from 'redux';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { addNewEdge, AddNewEdgeEvent, addNewField, AddNewFieldEvent, addNewTable } from './diagramActions';

export interface NodeModel extends BaseNodeModel {
    entity: string;
    fields: Array<string>;
}

export interface DiagramState {
    model: DiagramModel<NodeModel, LinkModel>;
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

const addNewFieldHandler = (state: DiagramState, payload: AddNewFieldEvent) => {
    const newNodes = _.cloneDeep(state.model.nodeDataArray);
    newNodes.forEach(entity => {
        if (entity.entity === payload.entity) {
            entity.fields.push(payload.field);
        }
    });

    return {
        ...state,
        model: {
            ...state.model,
            nodeDataArray: newNodes
        }
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

export const diagramReducer: Reducer<DiagramState> = reducerWithInitialState<DiagramState>({
    model: {
        nodeDataArray: [],
        linkDataArray: []
    }
})
    .case(addNewTable, addNewTableHandler)
    .case(addNewField, addNewFieldHandler)
    .case(addNewEdge, addNewEdgeHandler)
    .build();
