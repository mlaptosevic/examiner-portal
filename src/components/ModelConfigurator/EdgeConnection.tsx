import React, { RefObject } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import './EdgeConnection.css';

interface EdgeConnectionProps {
    onClick: (from: string, to: string) => void;
}

class EdgeConnection extends React.Component<EdgeConnectionProps> {
    private fromRef = React.createRef<HTMLInputElement>();
    private toRef = React.createRef<HTMLInputElement>();

    private onConnectClick = event => {
        let fromEntity;
        if (this.fromRef.current) {
            fromEntity = this.fromRef.current.value;
            this.fromRef.current.value = '';
        }

        let toEntity;
        if (this.toRef.current) {
            toEntity = this.toRef.current.value;
            this.toRef.current.value = '';
        }

        if (fromEntity && toEntity) {
            this.props.onClick(fromEntity, toEntity);
        }
    };

    render() {
        return (
            <div className="edge-connection">
                <div className="title"> Connection between entities </div>
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
}

export default EdgeConnection;
