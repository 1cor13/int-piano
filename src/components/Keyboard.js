import React, { Fragment, useContext } from "react";
import { BlackKey, WhiteKey } from "./Keys";
import { KeyboardContext } from "../contexts/KeyboardContext";


const Keyboard = () => {
    const { selectedNotes, onNotePressed, onNoteReleased, playingKeys } = useContext(KeyboardContext);
    console.log("selected keys", playingKeys);
    const KeyboardLayedOut = selectedNotes.map((selectedKey) => {
        console.log("selectedKey", selectedKey.includes("#"));
        const RenderedKey = selectedKey.includes('#') ? BlackKey : WhiteKey;
        const isKeyPlaying = playingKeys.includes(selectedKey);
        console.log(`X ${selectedKey} is Playing ${isKeyPlaying}` );
        // We are only handling mouse and touch event, no keyboard event.
        // move these into the key components themselves, and only pass onNotePressed, and onNoteReleased
        const eventHandlers = {
            onMouseDown: () => onNotePressed(selectedKey),
            onMouseUp: () => onNoteReleased(selectedKey),
            onMouseOut: () => onNoteReleased(selectedKey),
            onTouchStart: () => onNotePressed(selectedKey),
            onTouchEnd: () => onNoteReleased(selectedKey)
        };
        const props = { selectedKey, isKeyPlaying, eventHandlers };
        return <RenderedKey {...props}/>;
    });
    console.log("Keys",KeyboardLayedOut);

    // add this to the reducer of ChordPlayer Component, use the provider to pass the onNotePressed and onNoteReleased 
    // const playChordsHandler = (chords) => {
    //     const note = chords.shift();
    //     if(note && selectedNotes.includes(note)) {
    //         onNotePressed(note);
    //         const intervalID = setTimeout(() => {
    //             onNoteReleased(note);
    //             clearTimeout(intervalID);
    //             playChordsHandler(chords);
    //         }, 1000);
    //     } else if(chords.length > 0) {
    //         playChordsHandler(chords);     
    //     }
    // };

    return(
        // <div className="keyboard-container">
            <div className="keyboard-layer-container">
                {KeyboardLayedOut}
            </div>            
        // </div>
    );
};

export default Keyboard;
