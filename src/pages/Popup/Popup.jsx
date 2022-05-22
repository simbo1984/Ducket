import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../containers/api/db';
import { Source } from '../../containers/source';
import  * as setters from '../../containers/source-form';
import {SourceForm} from '../../containers/source-form';
import { GetUsedSourceFromStorage, TreeNav } from '../../containers/tree-nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LogoBar } from '../../containers/logo-bar';
import './Popup.css';

//TODO: Dynamical Light/Dark mode
//TODO: Add banner to indicate near expiration of PAT
//TODO: Add banner when failure with add source
//TODO: Font + Styling CSS
//TODO: Implement dynamic search

export let _setUsedSource;

export const Popup = () => {

  const [usedSource, setUsedSource] = useState(null);

  useEffect(async () => {

    _setUsedSource = setUsedSource;

    let sourceId = await GetUsedSourceFromStorage();
    if (sourceId === undefined) {
      setUsedSource(null);
    } else {
      setUsedSource(sourceId);
    }
    
  });

  const [isSetupMode, setIsSetupMode] = useState(false);

  const sources = useLiveQuery(
    () => db.sources.toArray()
  );

  if (!sources) return null; //Still loading



  function handleToggle(e) {

    e.preventDefault()

    isSetupMode ? setIsSetupMode(false) : setIsSetupMode(true);

  }

  function handleAdd(e) {

    e.preventDefault();

    if (setters._displayType === 'none') {
      setters._setDisplayType('flex');
      
    } else {

      setters._setEditedSource({ isEditMode: false, id: "" })
      setters._setSourceName("");
      setters._setOrganization("");
      setters._setProject("");
      setters._setRepo("");
      setters._setFilePath("");
      setters._setPat("");

      setters._setDisplayType('none');
    }
  }

  if (isSetupMode) {
    return (
      <div id='sub-app-container'>
        <LogoBar />
        <div className='topnav-container'>
          <FontAwesomeIcon icon='fa-solid fa-plus' className='clickable-icon' id='add-source' onClick={handleAdd} />
          <div id='empty-container'></div>
          <FontAwesomeIcon icon='fa-solid fa-book-bookmark' className='clickable-icon' id='go-to-bookmarks' onClick={handleToggle} />
        </div>
        <SourceForm />
        {sources.map(source => <Source key={source.id} source={source} usedSource={usedSource} />)}
      </div>
    );
  }

  return (
    <div id='sub-app-container'>
      <LogoBar />
      <div className='topnav-container' >
        <input type='text' id='search-box' placeholder='Search' />
        <FontAwesomeIcon icon='fa-solid fa-gear' className='clickable-icon' onClick={handleToggle} />
      </div>
      <TreeNav />
    </div>
  );
};