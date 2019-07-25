import React from 'react';
import './App.css';
import Diagram from './components/Diagram/Diagram';
import ModelConfigurator from './components/ModelConfigurator/ModelConfigurator';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <ModelConfigurator />
                <Diagram />
            </div>
        );
    }
}

export default App;
