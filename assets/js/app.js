import React from "react";
import ReactDOM from "react-dom"

import '../css/app.css';

const App = () => {
    return <h1>A</h1>;
}

const rootElement = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);
