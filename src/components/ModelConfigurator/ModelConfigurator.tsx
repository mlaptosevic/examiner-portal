import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DiagramState, NodeModel } from '../../reducers/diagramReducer';
import { addNewTable } from '../../reducers/diagramActions';
import { DiagramModel, LinkModel } from 'react-gojs';

interface ModelConfiguratorProps {
    addNewTableHandler: (tableName: string) => void;
    model: DiagramModel<NodeModel, LinkModel>;
}

class ModelConfigurator extends React.Component<ModelConfiguratorProps> {
    render() {
        const tableNames = this.props.model.nodeDataArray.map(node => node.tableName);

        return (
            <div>
                <button onClick={() => this.props.addNewTableHandler('test')}>Add table</button>
                <div>{tableNames}</div>
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
