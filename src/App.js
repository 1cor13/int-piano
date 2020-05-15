import React from 'react';
import Keyboard from './components/Keyboard'

import './App.css';

function App() {
  return (
    <div className="container">
      <Keyboard startKey = {"C3"} endKey = {"B3"}/> 
    </div>
  );
}

export default App;
