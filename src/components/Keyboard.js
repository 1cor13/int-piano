import React, { Fragment, useState } from "react";
import KeyLogger from "./Logger";
import ChordPlayer from "./ChordPlayer";
import {BlackKey, WhiteKey, AllNotes} from "./Keys";
import AllNotes from "../utils/Utils"

const Keyboard = ({
    startKey,
    endKey
}) => {
    const [state, setState] = useState({
        playingKeys: [],
        keyLogger:""
    });

    const selectedNotes = AllNotes.slice(AllNotes.indexOf(startKey), AllNotes.indexOf(endKey) + 1);
 
    const onNotePressed = (playedKey) => {
        setState({
            ...state,
            playingKeys: [...state.playingKeys, playedKey],
            keyLogger: playedKey
        });
    };

    const onNoteReleased = playedKey => {
        if(playedKey && selectedNotes.includes(playedKey)) {
            setState({
                ...state,
                playingKeys: state.playingKeys.filter(key => key !== playedKey),
                keyLogger:""
            });
        }  
    };
  
    const KeyboardLayedOut = selectedNotes.map((selectedKey) => {
        const RenderedKey = selectedKey.includes('#') ? BlackKey : WhiteKey;
        const isKeyPlaying = state.playingKeys.includes(selectedKey);

        // We are only handling mouse and touch event, no keyboard event.
        // move these into the key components themselves, and only pass onNotePressed, and onNoteReleased
        const eventHandlers = {
            onMouseDown: () => onNotePressed(selectedKey),
            onMouseUp: () => onNoteReleased(selectedKey),
            onMouseOut: () => onNoteReleased(selectedKey),
            onTouchStart: () => onNotePressed(selectedKey),
            onTouchEnd: () => onNoteReleased(selectedKey)
        };

        return (
            <Fragment key={selectedKey}>
                {/* use a provider and dispatch to render each key */}
                { RenderedKey(
                    selectedKey,
                    isKeyPlaying,
                    eventHandlers)
                }
            </Fragment>
        );
    });

    // add this to the reducer of ChordPlayer Component, use the provider to pass the onNotePressed and onNoteReleased 
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
    };

    return(
        <div className="keyboard-container">
            <div className="keyboard-layer-container">
                {KeyboardLayedOut}
            </div>
            <div className="key-logger-player"> {/* remove this, rather have it at the app component. coz its not part of the keyboard container atleast. */}
                <KeyLogger log = {state.keyLogger}/>
                <ChordPlayer onPlayChords={playChordsHandler}/>
            </div>
        </div>
    );
};

export default Keyboard;
