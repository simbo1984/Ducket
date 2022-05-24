import React, { useEffect, useState } from 'react';
import { TreeElement } from './tree-element';
import { db } from '../containers/api/db';
import { useLiveQuery } from 'dexie-react-hooks';

export let _setExpandedFolders;
export let _expandedFolders;
export let _links;
export let _searchText;
export let _setSearchText;

export const TreeNav = () => {

  const [expandedFolders, setExpandedFolders] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    _setExpandedFolders = setExpandedFolders;
    _setSearchText = setSearchText;
  });

  _expandedFolders = expandedFolders;
  _searchText = searchText;

  const links = useLiveQuery(
    async () => {

      const sourceId = await GetUsedSourceFromStorage();

      if (sourceId === undefined || sourceId === null) {
        return null;
      }
      const links = await db.links
        .where('sourceId')
        .equalsIgnoreCase(sourceId)
        .toArray();

      return links;
    });

  _links = links;

  function useFilter(link) {

    if (expandedFolders.length === 0) {
      return link.parentId === null;
    }

    return expandedFolders.includes(link.elementId) || expandedFolders.includes(link.parentId) || link.parentId === null;

  }

  function useSearch(link) {

    return link.url !== null && (link.name.indexOf(searchText) > -1 || link.url.indexOf(searchText) > -1);
  }

  if (searchText.length > 0) {
    return (
      <div className='tree'>
        {links?.filter(useSearch)
          .map(link => <TreeElement key={link.id} link={link} />)}
      </div>
    );
  } else {
    return (
      <div className='tree'>
        {links?.filter(useFilter)
          .map(link => <TreeElement key={link.id} link={link} />)}
      </div>
    );
  }
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

export function GetUsedSourceFromStorage() {

  let usedSource = chrome.storage.local.get('usedSource')
    .then(storageItem => usedSource = storageItem.usedSource);

  return usedSource;
} 