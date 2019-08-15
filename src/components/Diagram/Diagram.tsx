import React from 'react';
import { connect } from 'react-redux';
import go, { Diagram as DiagramGojs, GraphLinksModel } from 'gojs';
import './Diagram.css';
import { DiagramState } from '../../reducers/diagramReducer';
import { DiagramModel, LinkModel } from 'react-gojs';
import { NO_FIELD_UPDATE_EVENT, NodeModel } from '../../reducers/diagramReducer';
import {
    addNewField,
    FieldUpdateEvent,
    setActiveEntity,
    setFieldModal,
    setFieldUpdateToNone
} from '../../reducers/diagramActions';
import { Dispatch } from 'redux';
import { createLinkTemplates, createNodeTemplates } from './DiagramTemplates';

interface DiagramProps {
    model: DiagramModel<NodeModel, LinkModel>;
    addNewField: (entity: string, field: string) => void;
    setFieldModal: (value: boolean) => void;
    setActiveEntity: (entity: string) => void;
    setFieldUpdateToNone: () => void;
    fieldUpdate: FieldUpdateEvent;
}

class Diagram extends React.Component<DiagramProps> {
    private static DIAGRAM_CONTAINER = 'diagram-container';

    private diagram: DiagramGojs = {} as DiagramGojs;

    constructor(props) {
        super(props);
    }

    createModel = () => {
        const $ = go.GraphObject.make;

        return $(go.GraphLinksModel);
    };

    createDiagram = () => {
        const $ = go.GraphObject.make;

        return $(go.Diagram, Diagram.DIAGRAM_CONTAINER);
    };

    componentDidMount(): void {
        this.diagram = this.createDiagram();

        this.diagram.model = this.createModel();

        this.diagram.nodeTemplate = createNodeTemplates(this.props.setActiveEntity, this.props.setFieldModal);

        this.diagram.linkTemplate = createLinkTemplates();

        const model = this.createModel();

        this.diagram.model = model;
    }

    componentDidUpdate(prevProps: Readonly<DiagramProps>, prevState: Readonly<{}>, snapshot?: any): void {
        // Adding node
        if (this.props.model.nodeDataArray !== prevProps.model.nodeDataArray) {
            const lastElementIndex = this.props.model.nodeDataArray.length - 1;
            this.diagram.model.addNodeData(this.props.model.nodeDataArray[lastElementIndex]);
        }
        // Adding link
        if (this.props.model.linkDataArray !== prevProps.model.linkDataArray) {
            const lastElementIndex = this.props.model.linkDataArray.length - 1;
            (this.diagram.model as GraphLinksModel).addLinkData(this.props.model.linkDataArray[lastElementIndex]);
        }
        // Adding field
        if (this.props.fieldUpdate !== NO_FIELD_UPDATE_EVENT && this.props.fieldUpdate !== prevProps.fieldUpdate) {
            console.log(this.props.fieldUpdate);
            // From model
            const node = this.props.model.nodeDataArray.filter(
                node => node.entity === this.props.fieldUpdate.entity
            )[0];
            // From diagram
            const entity = this.diagram.model.findNodeDataForKey(this.props.fieldUpdate.entity);

            console.log(node.fields);

            if (entity && node) {
                this.diagram.model.addArrayItem(entity.fields, this.props.fieldUpdate.field);
            }

            this.props.setFieldUpdateToNone();
        }
    }

    render() {
        return <div id={Diagram.DIAGRAM_CONTAINER} />;
    }
}

const mapStateToProps = (state: DiagramState) => {
    return {
        model: state.model,
        fieldUpdate: state.fieldUpdate
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addNewField: (entity: string, field: string) => {
            dispatch(addNewField({ entity, field }));
        },

        setFieldModal: (newValue: boolean) => {
            dispatch(setFieldModal(newValue));
        },

        setActiveEntity: (activeEntity: string) => {
            dispatch(setActiveEntity(activeEntity));
        },

        setFieldUpdateToNone: () => {
            dispatch(setFieldUpdateToNone());
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Diagram);
