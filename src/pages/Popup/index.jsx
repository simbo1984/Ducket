import React from 'react';
import { render } from 'react-dom';
import { Popup } from './Popup';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faFolderClosed,
    faFolderOpen,
    faFile,
    faGear,
    faBookBookmark,
    faTrashCan,
    faPlus,
    faPen,
    faBucket
} from '@fortawesome/free-solid-svg-icons'
import {
    faSquare,
    faSquareCheck
} from '@fortawesome/free-regular-svg-icons'

import './index.css';

library.add(
    faFolderClosed,
    faFolderOpen,
    faFile,
    faGear,
    faBookBookmark,
    faTrashCan,
    faPlus,
    faPen,
    faSquare,
    faSquareCheck,
    faBucket);

render(<Popup />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
