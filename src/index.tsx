import * as React from "react";
import ReactDOM from 'react-dom';
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHome from "./AppHome";

/**
 * Use:
 * - App to build a faucet
 * - AppHome to build home page
 */

ReactDOM.render(
  <App />,
  document.getElementById('app')
);