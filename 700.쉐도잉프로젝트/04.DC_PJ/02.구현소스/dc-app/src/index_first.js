import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Ban from './dc/ban';



const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
    <>
        <Ban cat="main"/>
        <Ban cat="characters"/>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
