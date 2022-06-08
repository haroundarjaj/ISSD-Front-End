import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';

import "./assets/css/nucleo-icons.css";
import "./assets/scss/blk-design-system-react.scss?v=1.2.0";
import "./assets/demo/demo.css";

import App from './App';
import reportWebVitals from './reportWebVitals';
import SelectorPage from './Pages/selector/SelectorPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ExcepcionadasPage from './Pages/excepcionadas/ExcepcionadasPage';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.render(
  <ThemeProvider theme={darkTheme}>
    <BrowserRouter>
      <Switch>
        <Route path="/home" render={(props) => <App {...props} />} />
        <Route
          path="/selector"
          render={(props) => <SelectorPage {...props} />}
        />
        <Route
          path="/excepcionadas/:id"
          render={(props) => <ExcepcionadasPage {...props} />}
        />
        <Redirect from="/" to="/home" />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);

reportWebVitals();

