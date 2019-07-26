import React, { RefObject } from 'react';
import { Alert, Button, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { DiagramState, NO_ACTIVE_ENTITY, NodeModel } from '../../reducers/diagramReducer';
import { Dispatch } from 'redux';
import { addNewField, setActiveEntity, setFieldModal } from '../../reducers/diagramActions';
import { connect } from 'react-redux';

interface FieldModalProps {
    setFieldModal: (boolean) => void;
    addNewField: (entity: string, field: string) => void;
    setActiveEntity: (entity: string) => void;
    show: boolean;
    activeEntity: string;
    nodes: Array<NodeModel>;
}

interface FieldModalState {
    showError: boolean;
    errorMessage: string;
}

class FieldModal extends React.Component<FieldModalProps, FieldModalState> {
    private fieldNameRef = React.createRef<HTMLInputElement>();

    constructor(props) {
        super(props);

        this.state = {
            showError: false,
            errorMessage: 'Error'
        };
    }

    private checkIsFieldNameUnique = (entity: string, fieldName: string): boolean => {
        const filteredNodes = this.props.nodes.filter(node => node.key === entity);

        if (filteredNodes.length === 0) {
            console.log(`Entity: ${entity} doesn't exist`);
            return false;
        }

        if (filteredNodes.length !== 1) {
            console.warn(`Entity: ${entity} have multiply instances in model`);
        }

        return filteredNodes[0].fields.filter(field => field === fieldName).length === 0;
    };

    private save = event => {
        if (!this.fieldNameRef.current) {
            return;
        }

        let field = this.fieldNameRef.current.value;

        if (field === '' || field === ' ') {
            this.setState({
                showError: true,
                errorMessage: 'Empty string is not valid field name'
            });

            return;
        }

        if (this.props.activeEntity === NO_ACTIVE_ENTITY) {
            this.setState({
                showError: true,
                errorMessage: 'No entity is selected'
            });

            return;
        }

        if (!this.checkIsFieldNameUnique(this.props.activeEntity, field)) {
            this.setState({
                showError: true,
                errorMessage: `Field ${field} already exists`
            });

            return;
        }

        this.props.addNewField(this.props.activeEntity, field);

        this.close(null);
    };

    private close = event => {
        this.props.setActiveEntity(NO_ACTIVE_ENTITY);
        this.props.setFieldModal(false);

        if (this.fieldNameRef.current) {
            this.fieldNameRef.current.value = '';
        }
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.close(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add field to entity: {this.props.activeEntity}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
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
                            ref={this.fieldNameRef as RefObject<any>}
                            placeholder="Field name"
                            aria-label="Field name"
                        />
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.close}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.save}>
                        Save field
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

const mapStateToProps = (state: DiagramState) => {
    return {
        show: state.shouldShowFieldModal,
        activeEntity: state.activeEntity,
        nodes: state.model.nodeDataArray
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

        setActiveEntity: (newEntity: string) => {
            dispatch(setActiveEntity(newEntity));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FieldModal);
