import React, {Fragment, useRef, useState } from "react";

const octaves = [1, 2, 3, 4, 5, 6, 7];
const tones = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const AllNotes = octaves.reduce((notes, octave)=> {
    const octaveNotes = tones.map(tone => `${tone}${octave}`);
    return [...notes, ...octaveNotes];
}, []);
const textAreaText = [];
const Keyboard = ({
    startKey,
    endKey
}) => {
    const [state, setState] = useState({
        playingKeys: [],
        keyLogger:[],
        inputNotes:""
    });
    const chordsInput = useRef();
    const layedOutKeys = AllNotes.slice(AllNotes.indexOf(startKey), AllNotes.indexOf(endKey) + 1);

    const whiteKey = (keyText, isPlaying, eventHandlers) => {
        return(
            <button className={`white-key ${isPlaying? "white-key-playing": ""}`}
                { ...eventHandlers } >
                <div className={"key-text"}>{keyText}</div>
            </button>
        );
    };
    
    const blackKey = (keyText, isKeyPlaying, eventHandlers) => {
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
            keyLogger: [...state.keyLogger, playedKey]
        });
        console.log(`played: ${playedKey}`);
    }

    const onNoteReleased = playedKey => {
        setState({
            ...state,
            playingKeys: state.playingKeys.filter(key => key !== playedKey)
        });
    }
  
    const FullLayout = layedOutKeys.map((selectedKey) => {
        const RenderedKey = selectedKey.includes('#') ? blackKey : whiteKey;
        const isKeyPlaying = state.playingKeys.includes(selectedKey);

        // We are only handling mouse and touch event, no keyboard event.
        const eventHandlers = {
            onMouseDown: () => onNotePressed(selectedKey),
            onMouseUp: () => onNoteReleased(selectedKey),
            onMouseOut: () => onNoteReleased(selectedKey),
            onTouchStart: () => onNotePressed(selectedKey),
            onTouchEnd: () => onNoteReleased(selectedKey)
        }
        
        return (
            <Fragment key={selectedKey}>
                <RenderedKey
                    isKeyPlaying = {isKeyPlaying}
                    keyText = {selectedKey}
                    eventHandlers = {eventHandlers}
                />
            </Fragment>
        );
    });

    const KeyLogger = () => (
        <div className={"key-logger"}>
            <textarea readOnly>`${state.keyLogger.join(",") || "empty"}`</textarea>
        </div>
    );

    const  onPlayChords = ()=> {
        const chordKeys = chordsInput.current.value.split(",");
        playChords(chordKeys);       
    }

    const playChords = (chords) => {
        const note = chords.shift();
        if(note && AllNotes.includes(note)) {
            onNotePressed(note);
            const intervalID = setTimeout(() => {
                onNoteReleased(note);
                clearTimeout(intervalID);
                // console.log("cleared Timeout");
                playChords(chords);
                console.log("called new chords ", chords)
            }, 1000);
            // clearTimeout(intervalID);
        } else if(chords.length > 0) {
            playChords(chords);     
        }
    }

    return(
        <div className="keyboard-container">
            <div className="keyboard-layer-container">
                <Fragment>
                    {layedOutKeys.map(item => {
                        const isPlaying = state.playingKeys.includes(item);
                        const eventHandlers = {
                            onMouseDown: () => onNotePressed(item),
                            onMouseUp: () => onNoteReleased(item),
                            onMouseOut: () => onNoteReleased(item),
                            onTouchStart: () => onNotePressed(item),
                            onTouchEnd: () => onNoteReleased(item)
                        }
                        if(!item.includes("#")) { 
                            return (
                                <Fragment key={item}>
                                    <button className={`white-key ${isPlaying? "white-key-playing": ""}`}
                                        { ...eventHandlers } >
                                        <div className={"key-text"}>{item}</div>
                                    </button>
                                </Fragment>
                            )
                        }
                        return (
                            <Fragment key={item}>
                                <div className="black-key-wrapper">
                                    <button className={`black-key ${isPlaying? "black-key-playing": ""}`}
                                        { ...eventHandlers } >
                                        <div className={"key-text"}>{item}</div>
                                    </button>
                                </div>
                            </Fragment>
                        ) 
                    })                
                    }
                </Fragment>        
            </div>
            <div className="key-logger-player">
                <div className="key-logger">
                    <label>Keyboard Logger</label>
                    <textarea readOnly className="key-logger" value={state.keyLogger.join(",")}/>
                </div>
                <div className="player">
                    <input type="text" ref={chordsInput}/>
                    {/* <input type="textarea" /> */}
                    <input type="submit" onClick={onPlayChords}/>
                    {/* <input></input><button/> */}
                </div>
            </div>
        </div>
    );
};
// const MyKeyboard = ({startKey, endKey}) => {
//     return (
//         <div className="keyboard-container">
//             <Keyboard startKey = {"C3"} endKey = {"B3"}/>
//             <Fragment>
//             const KeyLogger = () => (
//         <div className={"key-logger"}>
//             <textarea readonly>`${state.keyLogger.join(",") || "empty"}`</textarea>
//         </div>
//     );
//             </Fragment>

//         </Fragment>

//     );


export  default Keyboard;