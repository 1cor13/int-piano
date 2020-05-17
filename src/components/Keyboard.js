import React, { Fragment, useState } from "react";
import KeyLogger from "./Logger";
import ChordPlayer from "./ChordPlayer";


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
        keyLogger:"",
        playChords: "",
        chordsInputValue:"",
    });

    const selectedNotes = AllNotes.slice(AllNotes.indexOf(startKey), AllNotes.indexOf(endKey) + 1);

    const WhiteKey = (keyText, isKeyPlaying, eventHandlers) => {
        return(
            <button className={`white-key ${isKeyPlaying? "white-key-playing": ""}`}
                { ...eventHandlers } >
                <div className={"key-text"}>{keyText}</div>
            </button>
        );
    };
    
    const BlackKey = (keyText, isKeyPlaying, eventHandlers) => {
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
    }

    const onNotePressed = (playedKey) => {
        setState({
            ...state,
            playingKeys: [...state.playingKeys, playedKey],
            keyLogger: playedKey
        });
        console.log(`played: ${playedKey}`);
        console.log(`new log state`, state.keyLogger);
    }

    const onNoteReleased = playedKey => {
        if(playedKey && selectedNotes.includes(playedKey)) {
            console.log("before release state", state);
            setState({
                ...state,
                playingKeys: state.playingKeys.filter(key => key !== playedKey),
                keyLogger:""
            });
            console.log("after release state", state);
        }
        
    }
  
    const KeyboardLayedOut = selectedNotes.map((selectedKey) => {
        const RenderedKey = selectedKey.includes('#') ? BlackKey : WhiteKey;
        const isKeyPlaying = state.playingKeys.includes(selectedKey);

        // We are only handling mouse and touch event, no keyboard event.
        const eventHandlers = {
            onMouseDown: () => onNotePressed(selectedKey),
            onMouseUp: () => onNoteReleased(selectedKey),
            // onMouseOut: () => onNoteReleased(selectedKey),
            onTouchStart: () => onNotePressed(selectedKey),
            onTouchEnd: () => onNoteReleased(selectedKey)
        };

        const keyText = selectedKey;
        return (
            <Fragment key={selectedKey}>
                { RenderedKey(
                    keyText,
                    isKeyPlaying,
                    eventHandlers)
                }
            </Fragment>
        );
    });

    const playChordsHandler = (chords) => {
        const note = chords.shift();
        if(note && selectedNotes.includes(note)) {
            onNotePressed(note);
            const intervalID = setTimeout(() => {
                onNoteReleased(note);
                clearTimeout(intervalID);
                playChordsHandler(chords);
            }, 1000);
        } else if(chords.length > 0) {
            playChordsHandler(chords);     
        }
    }
    console.log("state before rendering log", state);
    return(
        <div className="keyboard-container">
            <div className="keyboard-layer-container">
                {KeyboardLayedOut}
            </div>
            <div className="key-logger-player">
                <KeyLogger log = {state.keyLogger}/>
                <ChordPlayer onPlayChords={playChordsHandler}/>
            </div>
        </div>
    );
};

export  default Keyboard;
