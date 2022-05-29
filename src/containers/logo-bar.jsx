import React, { useState, useEffect } from 'react';
import logoOpened from '../assets/img/duck-open.svg'
import logoClosed from '../assets/img/duck-closed.svg'
import line from '../assets/img/line.svg'

export const LogoBar = () => {

    const [timeunits, setTimeunits] = useState(0);
    const [logo, setLogo] = useState(logoOpened);

    useEffect(() => {

        setTimeout(() => {

            if (timeunits > 3) {
                setLogo(logoClosed);
                setTimeunits(0);
            } else {
                setLogo(logoOpened);
                setTimeunits(seconds => seconds + 1);
            }
            
        }, 500);
    }, [timeunits])

    return (
        <div id='logo-bar'>
            <img id='logo' src={logo}></img>
            <img id='logo-line' src={line}></img>
            <span>Ducket</span>
        </div>
    );  
}
