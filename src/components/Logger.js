import React, { useRef } from "react";

const KeyLogger = ({log}) => {

    const refLogger = useRef();

    let logText = refLogger.current ? refLogger.current.value.trim(): "";
    logText += logText && !!log.trim() ? `,${log.trim()}`: log.trim();

    const onClearLog =() => {
        refLogger.current.value = "";
    };

    return (
        <div className={"key-logger"}>
            <label>Keyboard Logger</label>
            <textarea cols={30} rows={5} readOnly value={logText} ref={refLogger}/>
            <input type="submit" value="Clean log" onClick={onClearLog}/>
        </div>
    );
}

export default KeyLogger;
