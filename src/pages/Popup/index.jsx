import React from 'react';
import { render } from 'react-dom';
import { Popup } from './Popup';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faFolderClosed,
    faFolderOpen,
    faGear,
    faBookBookmark,
    faTrashCan,
    faSquarePlus,
    faPen,
    faEarthAmericas,
    faSquareCheck as faSquareCheckSolid,
    faSquareXmark,
    faMagnifyingGlass,
    faBox
} from '@fortawesome/free-solid-svg-icons'
import {
    faSquare,
    faSquareCheck
} from '@fortawesome/free-regular-svg-icons'
import {
    faGithub
} from '@fortawesome/fontawesome-free-brands'
import './index.css';

library.add(
    faFolderClosed,
    faFolderOpen,
    faGear,
    faBookBookmark,
    faTrashCan,
    faSquarePlus,
    faPen,
    faSquare,
    faSquareCheck,
    faSquareCheckSolid,
    faSquareXmark,
    faMagnifyingGlass,
    faEarthAmericas,
    faBox,
    faGithub);

render(<Popup />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
