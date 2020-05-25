import React, { useState } from "react";


const ChordPlayer = ({onPlayChords}) => {
    const [chords, setChord] = useState("");

    const onChange = (event) => {
        setChord(event.target.value);
    }

    const handlerPlayChord = () => {
        // dispatchEvent({type: 'PLAY_CHORDS', chords: chords.split(",")});
        onPlayChords(chords.split(","));
    };

    return (
        <div className="player">
            <textarea cols="30" rows="3" type="text" value={chords} onChange={onChange}/>
            <input type="submit" value="Play" onClick={handlerPlayChord}/>
        </div>
    );
}

export default ChordPlayer;
