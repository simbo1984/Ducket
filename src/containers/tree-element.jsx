import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { _setParentId } from './tree-nav';

export const TreeElement = ({ link }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const handleLink = e => {

    e.preventDefault();

    if (link.level != -1) {
      _setParentId(link.elementId);
    } else {
      window.open(link.url, '_blank');
    }

  }

  const handleFolder = e => {

    e.preventDefault();

    if (link.level != -1) {
      _setParentId(link.elementId);
    } else {
      window.open(link.url, '_blank');
    }

  }

  if (link.url) {

    return (
      <div className='link' onClick={handleLink} >
        <FontAwesomeIcon icon="fa-solid fa-file" /> {link.name}
      </div>
    );

  } else {

    let arrowIcon;

    if (isExpanded) {
      arrowIcon = <FontAwesomeIcon icon="fa-solid fa-caret-down" className='caret' />
    } else {
      arrowIcon = <FontAwesomeIcon icon="fa-solid fa-caret-right" className='caret' />
    }

    return (
      <div className='link' onClick={handleFolder} data-state={isExpanded}>
        {arrowIcon} <FontAwesomeIcon icon="fa-solid fa-folder" /> {link.name}
      </div>
    )


  }
}