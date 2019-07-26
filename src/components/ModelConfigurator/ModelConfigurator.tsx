import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DiagramState, NodeModel } from '../../reducers/diagramReducer';
import { addNewTable } from '../../reducers/diagramActions';
import { DiagramModel, LinkModel } from 'react-gojs';
import AddObjectSnippet from './AddObjectSnippet';
import EdgeConnection from './EdgeConnection';
import FieldModal from './FieldModal';
import StartQuestioning from './StartQuestioning';

interface ModelConfiguratorProps {
    addNewTable: (entity: string) => void;
    model: DiagramModel<NodeModel, LinkModel>;
}

class ModelConfigurator extends React.Component<ModelConfiguratorProps> {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <AddObjectSnippet
                    header="Add new Entity"
                    defaultButtonText="Add Entity"
                    defaultInputText="Entity name"
                    onClick={this.props.addNewTable}
                />
                <EdgeConnection />
                <FieldModal />
                <StartQuestioning />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addNewTable: (entity: string) => {
            dispatch(addNewTable(entity));
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
