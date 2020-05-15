import React, { Fragment, useState } from "react";

const octaves = [1, 2, 3, 4, 5, 6, 7];
const tones = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
export const AllNotes = octaves.reduce((notes, octave)=> {
    const octaveNotes = tones.map(tone => `${tone}${octave}`);
    return [...notes, ...octaveNotes];
}, []);

const Keyboard = ({
    startKey,
    endKey
}) => {
    const [state, setState] = useState({
        playingKeys: [],
        keyLogger:[]
    });

    const layedOutKeys = AllNotes.slice(AllNotes.indexOf(startKey), AllNotes.indexOf(endKey));
    
    const whiteKey = (keyText, isPlaying, eventHandlers) => {
        return(
            <button className={`white-key ${isPlaying? "white-key-playing": ""}`}
                { ...eventHandlers } >
                <div className={"key-text"}>{keyText}</div>
            </button>
        );
    };
    // const keyDownHandler = (event) => {
    //     console.log("===keydown===");
    //     console.log(event);
    // }
    // const keyUpHandler = (event) => {
    //     console.log("===keyup====");
    //     console.log(event);
    // }
    
    const blackKey = (keyText, isKeyPlaying, eventHandlers) => {
        return(
            <div className={`black-key-wrapper`}>
                <button className={`black-key 
                    ${isKeyPlaying ? 'black-key-playing': ''}`}
                    { ...eventHandlers }
                >
                    <div className={"key-text"}>{keyText}</div>
                </button>
            </div>
        );
    }

    const onNotePressed = (playedKey) => {
        setState({
            ...state,
            playingKeys: [...this.state.playingKeys, playedKey],
            keyLogger: [...this.state.keyLogger, playedKey]
        });
    }

    const onNoteReleased = playedKey => {
        setState({
            ...state,
            playingKeys: this.state.playingKeys.filter(key => key !== playedKey)
        })
    }
  
    const fullLayout= layedOutKeys.map((keyLayout, selectedKey) => {
        const RenderedKey = selectedKey.includes('#') ? blackKey : whiteKey;
        const isKeyPlaying = this.state.playingKeys.includes(selectedKey);

        // We are only handling mouse and touch event, no keyboard event.
        const eventHandlers = {
            onMouseDown: () => onNotePressed(selectedKey),
            onMouseUp: () => onNoteReleased(selectedKey),
            onMouseOut: () => onNoteReleased(selectedKey),
            onTouchStart: () => onNotePressed(selectedKey),
            onTouchEnd: () => onNoteReleased(selectedKey)
        }

        return (
            <RenderedKey
                isKeyPlaying = {isKeyPlaying}
                keyText = {selectedKey}
                eventHandlers = {eventHandlers}
            />
        );
    });

    const keyLogger = () => (
        <div className={"key-logger"}>
            <textarea>{this.state.keyLogger.join(",")}</textarea>
        </div>
    );
        
    return(
        <Fragment>
            { fullLayout }
            <keyLogger />
        </Fragment>
        );
};

export default Keyboard;