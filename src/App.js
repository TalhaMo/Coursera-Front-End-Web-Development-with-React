import React from 'react';
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter as Router} from 'react-router-dom'


function App() {

  return (
    <Router>
        <Main />
    </Router>
  );
}

export default App;
