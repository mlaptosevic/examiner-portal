import React, { RefObject } from 'react';
import './AddObjectSnippet.css';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

interface AddObjectSnippetProps {
    header?: string;
    onClick?: (event) => void;
    defaultButtonText?: string;
    defaultInputText?: string;
}

class AddObjectSnippet extends React.Component<AddObjectSnippetProps> {
    constructor(props) {
        super(props);
    }

    private inputRef = React.createRef<HTMLInputElement>();

    private onButtonClick = event => {
        if (this.inputRef.current && this.inputRef.current.value === '') {
            console.log('ERROR empty field');
            return;
        }

        if (this.inputRef.current && this.props.onClick) {
            const tmpInputText = this.inputRef.current.value;
            this.inputRef.current.value = '';
            this.props.onClick(tmpInputText);
        }
    };

    render() {
        const header = this.props.header ? <div className="title">{this.props.header}</div> : null;

        return (
            <div className="add-object-snippet">
                {header}
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

export default AddObjectSnippet;
