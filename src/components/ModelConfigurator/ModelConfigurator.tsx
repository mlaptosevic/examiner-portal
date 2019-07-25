import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DiagramState, NodeModel } from '../../reducers/diagramReducer';
import { addNewTable } from '../../reducers/diagramActions';
import { DiagramModel, LinkModel } from 'react-gojs';
import AddObjectSnippet from './AddObjectSnippet';

interface ModelConfiguratorProps {
    addNewTableHandler: (tableName: string) => void;
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
                    onClick={this.props.addNewTableHandler}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addNewTableHandler: (tableName: string) => {
            dispatch(addNewTable(tableName));
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
