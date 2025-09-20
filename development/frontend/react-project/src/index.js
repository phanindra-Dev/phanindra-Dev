import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import About from './components/About'; 
import contact from './components/contact'; 



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <>
      <About />
      <contact />
    </>

);
