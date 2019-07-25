import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { DiagramState, NO_ACTIVE_ENTITY } from '../../reducers/diagramReducer';
import { Dispatch } from 'redux';
import { addNewField, setActiveEntity, setFieldModal } from '../../reducers/diagramActions';
import { connect } from 'react-redux';

interface FieldModalProps {
    setFieldModal: (boolean) => void;
    addNewField: (entity: string, field: string) => void;
    setActiveEntity: (entity: string) => void;
    show: boolean;
    activeEntity: string;
}

class FieldModal extends React.Component<FieldModalProps> {
    private fieldNameRef = React.createRef<HTMLInputElement>();

    private save = event => {
        if (this.fieldNameRef.current && this.props.activeEntity !== NO_ACTIVE_ENTITY) {
            this.props.addNewField(this.props.activeEntity, this.fieldNameRef.current.value);
        }

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
            <Modal show={this.props.show}>
                <Modal.Header closeButton>
                    <Modal.Title>Add field to entity: {this.props.activeEntity}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input ref={this.fieldNameRef} placeholder="Field name" />
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
        activeEntity: state.activeEntity
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
