import React, { useEffect, useState } from 'react';
import { TreeElement } from './tree-element';
import { db } from '../containers/api/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export let _setParentId;

export const TreeNav = () => {

  const [parentId, setParentId] = useState(null);

  useEffect(() => {
    _setParentId = setParentId;
  });

  const links = useLiveQuery(
    async () => {

      const links = await db.links
        .where('sourceId')
        .equals('5fa80f87-a19f-4b32-8851-0a7f9b6205d9')
        .toArray();

      return links;
    });

  const handleBack = e => {

    e.preventDefault();

    setParentId(links.find(link => link.elementId === parentId).parentId);

  }

  return (
    <div className='tree'>
      <div className='treenav-tools'>
        <FontAwesomeIcon icon="fa-solid fa-circle-left" className='clickable-icon' onClick={handleBack} />
      </div>
      {links?.filter(link => link.parentId === parentId)
        .map(link => <TreeElement key={link.id} link={link} />)}
    </div>
  );

}