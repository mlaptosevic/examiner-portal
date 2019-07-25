import React from 'react';

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
            <div>
                <input ref={this.fromRef} placeholder="FROM ENTITY" />
                <input ref={this.toRef} placeholder="TO ENTITY" />
                <button onClick={this.onConnectClick}>Connect</button>
            </div>
        );
    }
}

export default EdgeConnection;
