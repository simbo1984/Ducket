import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../containers/api/db';
import { Source } from '../../containers/source';
import  * as sourceForm from '../../containers/source-form';
import {SourceForm} from '../../containers/source-form';
import { GetUsedSourceFromStorage, TreeNav, _setSearchText } from '../../containers/tree-nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LogoBar } from '../../containers/logo-bar';
import { _searchMode, _setSearchMode, SearchBar } from '../../containers/search-bar';
import { Banner } from '../../containers/banner';
import './Popup.css';

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

    if (sourceForm._displayType === 'none') {
      sourceForm._setDisplayType('flex');
      
    } else {

      sourceForm._setEditedSource({ isEditMode: false, id: "" })
      sourceForm._setSourceName("");
      sourceForm._setOrganization("");
      sourceForm._setProject("");
      sourceForm._setRepo("");
      sourceForm._setFilePath("");
      sourceForm._setPat("");

      sourceForm._setDisplayType('none');
    }
  }

  function handleSearch(e) {

    e.preventDefault();

    if (_searchMode === 'none') {
      
      _setSearchMode('flex');

    } else {

      document.getElementById('search-box').value = '';
      _setSearchText('');
      _setSearchMode('none');

    }
  }

  function handleGitHub(e) {

    e.preventDefault();

    window.open('https://github.com/simbo1984/Ducket', '_blank');

  }

  if (isSetupMode) {
    return (
      <div id='sub-app-container'>
        <LogoBar />
        <div className='topnav-container'>
          <FontAwesomeIcon icon='fa-solid fa-square-plus' className='toolbar-icon' id='add-source' onClick={handleAdd} />
          <span className='toolbar-span'>New source</span>
          <FontAwesomeIcon icon='fa-solid fa-book-bookmark' className='toolbar-icon' id='go-to-bookmarks' onClick={handleToggle} />
          <span className='toolbar-span'>Bookmarks</span>
          <FontAwesomeIcon icon='fa-brands fa-github' className='toolbar-icon' id='github-profile' onClick={handleGitHub} />
          <span className='toolbar-span'>About Ducket</span>
        </div>
        <SourceForm />
        <Banner />
        <div id='source-list'>
          <span id='source-list-title'>Available sources ({sources.length})</span>
          {sources.map(source => <Source key={source.id} source={source} usedSource={usedSource} />)}
        </div>     
      </div>
    );
  }

  return (
    <div id='sub-app-container'>
      <LogoBar />
      <div className='topnav-container' >
        <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' className='toolbar-icon' onClick={handleSearch} />
        <span className='toolbar-span'>Search</span>
        <FontAwesomeIcon icon='fa-solid fa-gear' className='toolbar-icon' onClick={handleToggle} />
        <span className='toolbar-span'>Options</span>
        <FontAwesomeIcon icon='fa-brands fa-github' className='toolbar-icon' onClick={handleGitHub} />
        <span className='toolbar-span'>About Ducket</span>
      </div>
      <SearchBar />
      <TreeNav />
    </div>
  );
};