import React, {Fragment, useState } from "react";

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
    console.log(octaves);
    console.log(tones);
    console.log(AllNotes);

    const [state, setState] = useState({
        playingKeys: [],
        keyLogger:[]
    });

    const layedOutKeys = AllNotes.slice(AllNotes.indexOf(startKey), AllNotes.indexOf(endKey)+1);

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
            playingKeys: [...this.state.playingKeys, playedKey],
            keyLogger: [...this.state.keyLogger, playedKey]
        });
    }

    const onNoteReleased = playedKey => {
        setState({
            ...state,
            playingKeys: state.playingKeys.filter(key => key !== playedKey)
        })
    }
  
    const FullLayout = layedOutKeys.map((selectedKey) => {
        // console.log(layedOutKeys);
        // console.log(state);
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
        console.log(`selected-Key ${selectedKey}`);
        console.log(`isPlaying: ${isKeyPlaying}`);
        console.log(`RenderedFragment`);
        
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
    // const KeyLogger = () => (
    //     <div className={"key-logger"}>
    //         <textarea readonly>{state.keyLogger.join(",")}</textarea>
    //     </div>
    // );
    const ddSrc = ["A", "A#"]; const ppStt = ["A"];
    console.log(layedOutKeys);
    return(
        <div className="keyboard-container">
        <Fragment>
            {layedOutKeys.map(item => {
                const isPlaying = ppStt.includes(item);
                const eventHandlers = undefined;
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
    );
};

export default Keyboard;