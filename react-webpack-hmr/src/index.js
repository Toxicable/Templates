import React from 'react';
import { render }  from 'react-dom';
import Routes from './routes'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
    <MuiThemeProvider>
        <Routes />
    </MuiThemeProvider>

);
const renderApp = () => {
    render(<App />, document.getElementById('root'))
};
renderApp();