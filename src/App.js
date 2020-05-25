import React from 'react';
import Keyboard from './components/Keyboard'
// import KeyLogger from "./components/Logger";
// import ChordPlayer from "./components/ChordPlayer";
import KeyboardContextProvider from "./contexts/KeyboardContext";
import './App.css';

function App() {
  return (
    <div className="app-container">
      <KeyboardContextProvider>
        <Keyboard/>
        {/* remove this, rather have it at the app component. coz its not part of the keyboard container atleast. */}
        {/* <div className="key-logger-player"> 
            <KeyLogger />
            <ChordPlayer />
        </div> */}
      </KeyboardContextProvider>
    </div>
    
  );
}

export default App;
