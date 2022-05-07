import React, { useEffect, useState } from 'react';
import { TreeElement } from './tree-element';
import { db } from '../containers/api/db';
import { useLiveQuery } from 'dexie-react-hooks';

export let _setSourceId;
export let _setExpandedFolders;
export let _expandedFolders;
export let _links;

export const TreeNav = () => {

  const [sourceId, setSourceId] = useState('4e4dba55-cbcd-45d9-a227-19cbc4cfe1ff') //TODO: To be set dynamically
  const [expandedFolders, setExpandedFolders] = useState([]);

  useEffect(() => {
    _setSourceId = setSourceId;
    _setExpandedFolders = setExpandedFolders;
  });

  _expandedFolders = expandedFolders;

  const links = useLiveQuery(
    async () => {

      const links = await db.links
        .where('sourceId')
        .equals(sourceId)
        .toArray();

      return links;
    });

  _links = links;

  function useFilter(link) {

    if (expandedFolders.length === 0) {
      return link.parentId === null;
    }

    return expandedFolders.includes(link.elementId) || expandedFolders.includes(link.parentId);

  }

  return (
    <div className='tree'>
      {links?.filter(useFilter)
        .map(link => <TreeElement key={link.id} link={link} />)}
    </div>
  );

}

export function CollapseFolders(collapsedElementId) {

  let i = 1;
  let directChildElementsId = [collapsedElementId];
  let expandedFoldersNew = _expandedFolders.filter(element => !(directChildElementsId.includes(element)));

  do {

    directChildElementsId = _links
      .filter(link => directChildElementsId.includes(link.parentId))
      .map(link => link.elementId);
    expandedFoldersNew = expandedFoldersNew.filter(element => !(directChildElementsId.includes(element)));

    i++

  } while (i < _expandedFolders.length);

  _setExpandedFolders(expandedFoldersNew);

}