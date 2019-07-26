import React, { RefObject } from 'react';
import { Alert, Button, FormControl, InputGroup } from 'react-bootstrap';
import './EdgeConnection.css';
import { DiagramState, NodeModel } from '../../reducers/diagramReducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { addNewEdge } from '../../reducers/diagramActions';
import { LinkModel } from 'react-gojs';

interface EdgeConnectionProps {
    addNewEdge: (from: string, to: string) => void;
    edges: Array<LinkModel>;
    nodes: Array<NodeModel>;
}

interface EdgeConnectionState {
    showError: boolean;
    errorMessage: string;
}

class EdgeConnection extends React.Component<EdgeConnectionProps, EdgeConnectionState> {
    private fromRef = React.createRef<HTMLInputElement>();
    private toRef = React.createRef<HTMLInputElement>();

    constructor(props) {
        super(props);

        this.state = {
            showError: false,
            errorMessage: 'Error'
        };
    }

    private onConnectClick = event => {
        if (!this.fromRef.current || !this.toRef.current) {
            return;
        }

        const fromEntity = this.fromRef.current.value;
        const toEntity = this.toRef.current.value;

        if (!this.doesEntityExists(fromEntity)) {
            this.setState({
                showError: true,
                errorMessage: `Entity ${fromEntity} doesn't exist`
            });

            return;
        }

        if (!this.doesEntityExists(toEntity)) {
            this.setState({
                showError: true,
                errorMessage: `Entity ${toEntity} doesn't exist`
            });

            return;
        }

        if (!this.isEdgeUnique(fromEntity, toEntity)) {
            this.setState({
                showError: true,
                errorMessage: `Relationship between ${fromEntity} -> ${toEntity} already exists`
            });

            return;
        }

        this.restartToDefaultValues();

        if (fromEntity && toEntity) {
            this.props.addNewEdge(fromEntity, toEntity);
        }
    };

    private doesEntityExists = entity => {
        return this.props.nodes.filter(node => node.key === entity).length !== 0;
    };

    private restartToDefaultValues = () => {
        if (this.toRef.current && this.fromRef.current) {
            this.toRef.current.value = '';
            this.fromRef.current.value = '';
        }

        this.setState({ showError: false });
    };

    render() {
        return (
            <div className="edge-connection">
                <div className="title"> Connection between entities</div>
                <Alert
                    show={this.state.showError}
                    variant="danger"
                    onClose={() => this.setState({ showError: false })}
                    dismissible
                >
                    {this.state.errorMessage}
                </Alert>
                <InputGroup>
                    <FormControl
                        ref={this.fromRef as RefObject<any>}
                        placeholder="From entity"
                        aria-label="From entity"
                    />
                    <FormControl ref={this.toRef as RefObject<any>} placeholder="To entity" aria-label="To entity" />
                    <InputGroup.Append>
                        <Button variant="success" onClick={this.onConnectClick}>
                            Connect
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }

    private isEdgeUnique = (fromEntity: string, toEntity: string) => {
        const edgeUnique =
            this.props.edges.filter(edge => edge.from === fromEntity && edge.to === toEntity).length === 0;

        if (!edgeUnique) {
            return false;
        }

        return this.props.edges.filter(edge => edge.from === toEntity && edge.to === fromEntity).length === 0;
    };
}

const mapStateToProps = (state: DiagramState) => {
    return {
        edges: state.model.linkDataArray,
        nodes: state.model.nodeDataArray
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        addNewEdge: (from, to) => dispatch(addNewEdge({ from, to }))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EdgeConnection);
