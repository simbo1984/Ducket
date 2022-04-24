import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { LinksCollection } from '../api/links/links';
import { TreeElement } from './tree-element';

export let _setParentId;

export const TreeNav = () => {

  const [parentId, setParentId] = useState(null)

  useEffect(() => {
    _setParentId = setParentId;
  })

  const links = useTracker(() => LinksCollection.find({}).fetch()); //TODO: use only active sourceId
  
  const handleBack = e => {

    e.preventDefault();

    setParentId(links.find(link => link.elementId === parentId).parentId);
    
  }

  return(
    <div className='tree'>
      <div className='back-button' onClick={handleBack}>Back</div>
      { links
        .filter(link => link.parentId === parentId)
        .map(link => <TreeElement key={ link._id } link={ link } />) }
    </div>
  );
}