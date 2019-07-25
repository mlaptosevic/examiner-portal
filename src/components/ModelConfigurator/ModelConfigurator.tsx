import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DiagramState, NodeModel } from '../../reducers/diagramReducer';
import { addNewEdge, addNewTable } from '../../reducers/diagramActions';
import { DiagramModel, LinkModel } from 'react-gojs';
import AddObjectSnippet from './AddObjectSnippet';
import EdgeConnection from './EdgeConnection';

interface ModelConfiguratorProps {
    addNewTable: (entity: string) => void;
    addNewEdge: (from: string, to: string) => void;
    model: DiagramModel<NodeModel, LinkModel>;
}

class ModelConfigurator extends React.Component<ModelConfiguratorProps> {
    render() {
        return (
            <div>
                <AddObjectSnippet
                    header="Add new Entity"
                    defaultButtonText="Add Entity"
                    defaultInputText="Entity name"
                    onClick={this.props.addNewTable}
                />
                <EdgeConnection onClick={this.props.addNewEdge} />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addNewTable: (entity: string) => {
            dispatch(addNewTable(entity));
        },
        addNewEdge: (from: string, to: string) => {
            dispatch(addNewEdge({ from, to }));
        }
    };
};

const mapStateToProps = (state: DiagramState) => {
    return {
        model: state.model
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModelConfigurator);
