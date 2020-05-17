import React, { useState } from "react";

const ChordPlayer = ({onPlayChords}) => {
    const [state, setState] = useState({
        chordsInputValue:""
    });

    const onChange =(event)=> {
        setState({
            ...state,
            chordsInputValue: event.target.value
        });
    }

    const playChordsHandler = () => {
        onPlayChords(state.chordsInputValue.split(","));
    };

    return (
        <div className="player">
            <textarea cols="30" rows="3" type="text" value={state.chordsInputValue} onChange={onChange}/>
            <input type="submit" value="Play" onClick={playChordsHandler}/>
        </div>
    );
}

export default ChordPlayer;
