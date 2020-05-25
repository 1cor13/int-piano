import React from "react";

export const BlackKey = (keyText, isKeyPlaying, eventHandlers) => {
    return(
        <div className="black-key-wrapper">
            <button className={`black-key 
                ${isKeyPlaying ? "black-key-playing": ""}`}
                { ...eventHandlers }
            >
                <div className={"key-text"}>{keyText}</div>
            </button>
        </div>
    );
};

export const WhiteKey = (keyText, isKeyPlaying, eventHandlers) => {
    return(
        <button className={`white-key ${isKeyPlaying? "white-key-playing": ""}`}
            { ...eventHandlers } >
            <div className={"key-text"}>{keyText}</div>
        </button>
    );
};
