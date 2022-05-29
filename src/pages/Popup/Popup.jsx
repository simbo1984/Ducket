import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../containers/api/db';
import { Source } from '../../containers/source';
import { SourceForm } from '../../containers/source-form';
import { TopNav } from '../../containers/top-nav';
import { GetUsedSourceFromStorage, TreeNav, _setSearchText } from '../../containers/tree-nav';
import { LogoBar } from '../../containers/logo-bar';
import { _searchMode, _setSearchMode, SearchBar } from '../../containers/search-bar';
import { Banner } from '../../containers/banner';
import './Popup.css';

export let _setUsedSource;
export let _setIsSetupMode;

export const Popup = () => {

  const [usedSource, setUsedSource] = useState(null);
  const [isSetupMode, setIsSetupMode] = useState(false);

  useEffect(async () => {

    _setUsedSource = setUsedSource;
    _setIsSetupMode = setIsSetupMode;

    let sourceId = await GetUsedSourceFromStorage();
    if (sourceId === undefined) {
      setUsedSource(null);
    } else {
      setUsedSource(sourceId);
    }
    
  });

  const sources = useLiveQuery(
    () => db.sources.toArray()
  );

  if (!sources) return null; //Still loading

  if (isSetupMode) {
    return (
      <div id='sub-app-container'>
        <LogoBar />
        <TopNav isSetupMode={isSetupMode}/>
        <SourceForm />
        <Banner />
        <div id='source-list'>
          <span id='source-list-title'>Available sources ({sources.length})</span>
          {sources.map(source => <Source key={source.id} source={source} usedSource={usedSource} />)}
        </div>     
      </div>
    );
  } else {
    return (
      <div id='sub-app-container'>
        <LogoBar />
        <TopNav isSetupMode={isSetupMode}/>
        <SearchBar />
        <TreeNav />
      </div>
    );
  }


};