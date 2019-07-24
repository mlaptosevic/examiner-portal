import React from 'react';
// import {GojsDiagram} from "react-gojs";
import go from 'gojs';
import './Diagram.css';

class Diagram extends React.Component {
    private static DIAGRAM_CONTAINER = 'diagram-container';

    constructor(props) {
        super(props);
    }

    createModel = () => {
        const $ = go.GraphObject.make;

        const model = $(go.GraphLinksModel);

        model.nodeDataArray = [
            { key: 'Alpha', tableName: 'Users', fields: ['id', 'first name', 'age'] },
            { key: 'Beta', tableName: 'Shipment' },
            { key: 'Gamma', tableName: 'Credit Card' }
        ];

        model.linkDataArray = [{ from: 'Alpha', to: 'Beta' }, { from: 'Alpha', to: 'Gamma' }];

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
        const diagram = this.createDiagram();
        const model = this.createModel();
        const templates = this.createTemplates();

        diagram.model = model;
        diagram.nodeTemplate = templates;
    }

    render() {
        return <div id={Diagram.DIAGRAM_CONTAINER}></div>;
    }
}

export default Diagram;
