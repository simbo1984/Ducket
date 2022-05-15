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

      return (link.level + 1) * 8;

    } else {

      let parentLevel = _links.find(element => element.elementId === link.parentId).level;
      return (parentLevel + 1) * 8 + 8;

    }
  }

  if (link.url) {

    return (
      <div className='link' onClick={handleLink} style={{ marginLeft: setIndention(false)}} >
        <FontAwesomeIcon icon="fa-solid fa-file" /> {link.name}
      </div>
    );

  } else {

    return (
      <div className='link' onClick={handleFolder} style={{ marginLeft: setIndention(true)}} >
        <FontAwesomeIcon icon={ (isFolderExpanded) ? "fa-solid fa-folder-open" : "fa-solid fa-folder-closed" }  /> {link.name}
      </div>
    )


  }
}