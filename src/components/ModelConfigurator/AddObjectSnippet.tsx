import React from 'react';

interface AddObjectSnippetProps {
    header?: string;
    onClick?: (event) => void;
    defaultButtonText?: string;
    defaultInputText?: string;
}

interface AddObjectSnippetState {
    inputText: string;
}

class AddObjectSnippet extends React.Component<AddObjectSnippetProps, AddObjectSnippetState> {
    constructor(props) {
        super(props);

        this.state = {
            inputText: ''
        };
    }

    private inputRef = React.createRef<HTMLInputElement>();

    private onInputChange = event => {
        this.setState({ inputText: event.target.value });
    };

    private onButtonClick = event => {
        if (this.inputRef.current) {
            this.inputRef.current.value = '';
        }

        if (this.props.onClick) {
            this.props.onClick(this.state.inputText);
        }
    };

    render() {
        const header = this.props.header ? <div>{this.props.header}</div> : null;

        return (
            <div>
                {header}
                <input onChange={this.onInputChange} ref={this.inputRef} placeholder={this.props.defaultInputText} />
                <button onClick={this.onButtonClick}>{this.props.defaultButtonText}</button>
            </div>
        );
    }
}

export default AddObjectSnippet;
