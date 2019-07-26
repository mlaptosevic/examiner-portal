import React, { RefObject } from 'react';
import './AddObjectSnippet.css';
import { Alert, Button, FormControl, InputGroup } from 'react-bootstrap';
import { DiagramState, NodeModel } from '../../reducers/diagramReducer';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface AddObjectSnippetProps {
    header?: string;
    onClick?: (event) => void;
    defaultButtonText?: string;
    defaultInputText?: string;
    nodes: Array<NodeModel>;
}

interface AddObjectSnippetState {
    showError: boolean;
    errorMessage: string;
}

class AddObjectSnippet extends React.Component<AddObjectSnippetProps, AddObjectSnippetState> {
    constructor(props) {
        super(props);

        this.state = {
            showError: false,
            errorMessage: 'Error'
        };
    }

    private inputRef = React.createRef<HTMLInputElement>();

    private onButtonClick = event => {
        if (!this.inputRef.current) {
            return;
        }

        const entity = this.inputRef.current.value;

        if (entity === '' || entity === ' ') {
            this.setState({
                showError: true,
                errorMessage: 'Empty string is not valid entity name'
            });
            return;
        }

        if (!this.checkIsEntityNameUnique(entity)) {
            this.setState({
                showError: true,
                errorMessage: `Entity ${entity} already exists`
            });
            return;
        }

        if (this.props.onClick) {
            this.setToDefaultState();
            this.props.onClick(entity);
        }
    };

    private checkIsEntityNameUnique = (entity: string) => {
        return this.props.nodes.filter(node => node.key === entity).length === 0;
    };

    private setToDefaultState = () => {
        if (this.inputRef.current) {
            this.inputRef.current.value = '';
        }
        this.setState({ showError: false });
    };

    render() {
        const header = this.props.header ? <div className="title">{this.props.header}</div> : null;

        return (
            <div className="add-object-snippet">
                {header}
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
                        ref={this.inputRef as RefObject<any>}
                        placeholder={this.props.defaultInputText}
                        aria-label={this.props.defaultInputText}
                    />
                    <InputGroup.Append>
                        <Button variant="success" onClick={this.onButtonClick}>
                            {this.props.defaultButtonText}
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}

const mapStateToProps = (state: DiagramState) => {
    return {
        nodes: state.model.nodeDataArray
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddObjectSnippet);
