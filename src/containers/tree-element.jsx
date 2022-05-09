import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { _setExpandedFolders, _expandedFolders, _links, CollapseFolders } from './tree-nav';

export const TreeElement = ({ link }) => {

  const [isFolderExpanded, setIsFolderExpanded] = useState(false);

  const handleLink = e => {

    e.preventDefault();

    window.open(link.url, '_blank');

  }

  const handleFolder = e => {

    e.preventDefault();

    if (!isFolderExpanded) {

      _setExpandedFolders(_expandedFolders => [..._expandedFolders, link.elementId]);
      setIsFolderExpanded(true);

    } else {

      CollapseFolders(link.elementId);
      setIsFolderExpanded(false);

    }
  }

  const setIndention = (isFolder) => {

    if (isFolder) {

      return (link.level + 1) * 4;

    } else {

      let parentLevel = _links.find(element => element.elementId === link.parentId).level;
      return (parentLevel + 1) * 4 + 20;

    }
  }

  if (link.url) {

    return (
      <div className='link' onClick={handleLink} style={{ marginLeft: setIndention(false) }} >
        <FontAwesomeIcon icon="fa-solid fa-file" /> {link.name}
      </div>
    );

  } else {

    let arrowIcon;
    if (isFolderExpanded) {

      arrowIcon = <FontAwesomeIcon icon="fa-solid fa-caret-down" className='caret' />

    } else {

      arrowIcon = <FontAwesomeIcon icon="fa-solid fa-caret-right" className='caret' />

    }

    return (
      <div className='link' onClick={handleFolder} style={{ marginLeft: setIndention(true) }} >
        <div className='clickable-icon' id='folder-arrow'>{arrowIcon}</div>
        <FontAwesomeIcon icon="fa-solid fa-folder" className='clickable-icon' /> {link.name}
      </div>
    )


  }
}