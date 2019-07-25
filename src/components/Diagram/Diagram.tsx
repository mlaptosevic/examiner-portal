import React from 'react';
import { connect } from 'react-redux';
import go, { Diagram as DiagramGojs } from 'gojs';
import './Diagram.css';
import { DiagramState } from '../../reducers/diagramReducerLegacy';
import { DiagramModel, LinkModel } from 'react-gojs';
import { NodeModel } from '../../reducers/diagramReducer';

interface DiagramProps {
    model: DiagramModel<NodeModel, LinkModel>;
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

        const model = $(go.GraphLinksModel);

        // model.nodeDataArray = [
        //     { key: 'Alpha', tableName: 'Users', fields: ['id', 'first name', 'age'] },
        //     { key: 'Beta', tableName: 'Shipment' },
        //     { key: 'Gamma', tableName: 'Credit Card' }
        // ];
        //
        // model.linkDataArray = [{ from: 'Alpha', to: 'Beta' }, { from: 'Alpha', to: 'Gamma' }];

        return model;
    };

    createTemplates = () => {
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
                $(go.TextBlock, { margin: 5 }, new go.Binding('text', 'tableName')),
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
                            $(go.TextBlock, new go.Binding('text', ''), { margin: 2 })
                        )
                    }
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
        const model = this.createModel();
        const templates = this.createTemplates();

        this.diagram.model = model;
        this.diagram.nodeTemplate = templates;

        this.isInitializationCompleted = true;
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

export default connect(mapStateToProps)(Diagram);
