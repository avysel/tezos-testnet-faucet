import * as React from "react";
import ReactDOM from 'react-dom';
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import About from "./components/pages/About";
import Unknown from "./components/pages/Unknown";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Unknown/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode >,
  document.getElementById('app')
);