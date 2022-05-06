import React from 'react';
import { render } from 'react-dom';
import { Popup } from './Popup';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faFolder,
    faFile,
    faGear,
    faBookBookmark,
    faCircleLeft,
    faCaretDown,
    faCaretRight
} from '@fortawesome/free-solid-svg-icons'

import './index.css';

library.add(
    faFolder,
    faFile,
    faGear,
    faBookBookmark,
    faCircleLeft,
    faCaretDown,
    faCaretRight);

render(<Popup />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
