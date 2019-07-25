import React from 'react';
import { connect } from 'react-redux';
import go, { Diagram as DiagramGojs } from 'gojs';
import './Diagram.css';
import { DiagramState } from '../../reducers/diagramReducerLegacy';
import { DiagramModel, LinkModel } from 'react-gojs';
import { NodeModel } from '../../reducers/diagramReducer';
import { addNewField, setActiveEntity, setFieldModal } from '../../reducers/diagramActions';
import { Dispatch } from 'redux';

interface DiagramProps {
    model: DiagramModel<NodeModel, LinkModel>;
    addNewField: (entity: string, field: string) => void;
    setFieldModal: (value: boolean) => void;
    setActiveEntity: (entity: string) => void;
}

class Diagram extends React.Component<DiagramProps> {
    private static DIAGRAM_CONTAINER = 'diagram-container';

    private isInitializationCompleted = false;
    private diagram: DiagramGojs = {} as DiagramGojs;

    constructor(props) {
        super(props);
    }

    createModel = () => {
        const $ = go.GraphObject.make;

        return $(go.GraphLinksModel);
    };

    createNodeTemplates = () => {
        const $ = go.GraphObject.make;

        return $(
            go.Node,
            'Auto',
            $(go.Shape, {
                figure: 'RoundedRectangle',
                fill: 'lightgrey'
            }),
            $(
                go.Panel,
                'Vertical',
                $(go.TextBlock, { margin: 5, width: 130 }, new go.Binding('text', 'entity')),
                $(
                    go.Panel,
                    'Vertical',

                    new go.Binding('itemArray', 'fields'),
                    {
                        itemTemplate: $(
                            go.Panel,
                            'Auto',
                            { margin: 2 },
                            $(go.Shape, 'RoundedRectangle', { fill: '#91E3E0' }),
                            $(go.TextBlock, new go.Binding('text', ''), { margin: 2, editable: true })
                        )
                    }
                ),
                $(
                    'Button',
                    {
                        margin: 2,
                        alignment: go.Spot.Right,
                        click: (e, obj) => {
                            if (obj.part && obj.part.data) {
                                // this.props.addNewField(obj.part.data.key, 'FIELD');
                                this.props.setActiveEntity(obj.part.data.key);
                                this.props.setFieldModal(true);
                            }
                        }
                    },
                    $(go.TextBlock, '+')
                )
            )
        );
    };

    createDiagram = () => {
        const $ = go.GraphObject.make;

        return $(go.Diagram, Diagram.DIAGRAM_CONTAINER);
    };

    componentDidMount(): void {
        this.diagram = this.createDiagram();

        this.diagram.model = this.createModel();

        this.diagram.nodeTemplate = this.createNodeTemplates();

        this.diagram.linkTemplate = this.createLinkTemplates();

        this.isInitializationCompleted = true;
    }

    private createLinkTemplates() {
        const $ = go.GraphObject.make;

        return $(go.Link, $(go.Shape));
    }

    render() {
        if (this.isInitializationCompleted) {
            const model = this.createModel();
            model.nodeDataArray = this.props.model.nodeDataArray;
            model.linkDataArray = this.props.model.linkDataArray;

            this.diagram.model = model;
        }

        return <div id={Diagram.DIAGRAM_CONTAINER}></div>;
    }
}

const mapStateToProps = (state: DiagramState) => {
    return {
        model: state.model
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Diagram);
