import React from 'react';
import * as setters from './tree-nav';

export const TreeElement = ({ link }) => {

  const handleClick = e => {

    e.preventDefault();

    if (link.level != -1) {
      setters._setParentId(link.elementId);
    } else {
      window.open(link.url, '_blank');
    }

  }
  
  return (
    <div className='link' onClick={ handleClick }>
      {link.name}
    </div>
  );

}