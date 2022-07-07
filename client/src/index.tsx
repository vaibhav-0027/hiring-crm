import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainApp from "./routes/MainApp";
import 'react-toastify/dist/ReactToastify.css';
import "./assets/scss/styles.scss";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <MainApp />
);
