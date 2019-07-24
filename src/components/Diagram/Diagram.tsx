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
            {'key': 'Alpha'},
            {'key': 'Beta'},
            {'key': 'Gamma'}
        ];

        model.linkDataArray = [
            {'from': 'Alpha', 'to': 'Beta'},
            {'from': 'Alpha', 'to': 'Gamma'}
        ];

        return model;
    };

    createDiagram = () => {
        const $ = go.GraphObject.make;

        return $(go.Diagram, Diagram.DIAGRAM_CONTAINER);

    };

    componentDidMount(): void {
        const model = this.createModel();
        const diagram = this.createDiagram();

        diagram.model = model;
    }

    render() {


        return (
            <div id={Diagram.DIAGRAM_CONTAINER}></div>
        );
    };
}

export default Diagram;