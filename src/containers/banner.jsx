import React, { useState, useEffect } from 'react';

export let _setError;

export const Banner = () => {

    const [error, setError] = useState({
        message: "",
        type: "negative",
        timeLeft: 0
    });

    useEffect(() => {
        _setError = setError;

        if (error.message.length > 0) {
            const timer = setTimeout(() => {
                setError({
                    message: error.message, 
                    type: error.type,
                    timeLeft: error.timeLeft - 1
                })
            }, 1000);
    
            return () => clearTimeout(timer);
        }
    });

    function setStyle(displayType) {
        return {
            display: displayType,
            backgroundColor: `var(--semantic-${error.type})`,
            color: `var(--semantic-text)`,
            borderColor: `var(--semantic-${error.type}-border)`,
        }
    }

    if (error.message.length > 0 && error.timeLeft > 0) {
        return (
            <div id='semantic-banner' style={setStyle('block')}>{error.message}</div>
        );  
    }

    return <div id='semantic-banner' style={setStyle('none')}>{error.message}</div>;
}