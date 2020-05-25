import React from "react";


export const BlackKey = ({ selectedKey, isKeyPlaying, eventHandlers}) => {
    // console.log(`Black ${selectedKey} is Playing ${isKeyPlaying}` );
    return(
        <div className="black-key-wrapper" key={selectedKey}>
            <button className={`black-key 
                ${isKeyPlaying ? "black-key-playing": ""}`}
                { ...eventHandlers }
            >
                <div className={"key-text"}>{selectedKey}</div>
            </button>
        </div>
    );
};

export const WhiteKey = ({selectedKey, isKeyPlaying, eventHandlers}) => {
    // console.log(`White ${selectedKey} is Playing ${isKeyPlaying}` );
    return(
        <button className={`white-key ${isKeyPlaying? "white-key-playing": ""}`}
            { ...eventHandlers } key={selectedKey} >
            <div className={"key-text"}>{selectedKey}</div>
        </button>
    );
};
