import React, { useRef } from "react";

const KeyLogger = ({log}) => {

    const refLogger = useRef();
    let logText = "";
    let log_ = log.trim();

    if(refLogger.current) {
        logText = refLogger.current.value.trim();
        logText += logText && !!log_ ? `,${log_}`: log_;
    }

    const onClearLog =() => {
        refLogger.current.value = "";
    };

    return (
    <div className={"key-logger"}>
        <label>Keyboard Logger</label>
        <textarea cols={30} rows={5} readOnly value={logText} ref={refLogger}/>
        <input type="submit" value="Clean log"/>
    </div>
    );
}

export default KeyLogger;