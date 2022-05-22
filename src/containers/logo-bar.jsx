import React from 'react';
import logo from '../assets/img/ducket-logo.svg'
import line from '../assets/img/line.svg'

export const LogoBar = () => {
    return (
        <div id='logo-bar'>
            <img id='logo' src={logo}></img>
            <img id='logo-line' src={line}></img>
            <span>Ducket</span>
        </div>
    );  
}
