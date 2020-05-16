import React from 'react';
import Keyboard from './components/Keyboard'

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Keyboard startKey = {"C3"} endKey = {"B3"}/> 
      <Keyboard startKey = {"C1"} endKey = {"B3"}/> 
      <Keyboard startKey = {"C1"} endKey = {"B1"}/>
    </div>
    
  );
}

export default App;
