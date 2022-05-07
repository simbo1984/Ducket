import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../containers/api/db';
import { Source } from '../../containers/source';
import { SourceForm } from '../../containers/source-form';
import { TreeNav } from '../../containers/tree-nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Popup.css';

export const Popup = () => {

  const [isSetupMode, setIsSetupMode] = useState(false);
  const sources = useLiveQuery(
    () => db.sources.toArray()
  );

  if (!sources) return null; //Still loading

  function handleToggle(e) {

    isSetupMode ? setIsSetupMode(false) : setIsSetupMode(true);

  }

  if (isSetupMode) {
    return (
      <div>
        <div className='topnav-container'>
          <FontAwesomeIcon icon='fa-solid fa-plus' className='clickable-icon' id='add-source' />
          <div id='empty-container'></div>
          <FontAwesomeIcon icon='fa-solid fa-book-bookmark' className='clickable-icon' id='go-to-bookmarks' onClick={handleToggle} />
        </div>
        <SourceForm />
        {sources.map(source => <Source key={source.id} source={source} />)}
      </div>
    );
  }

  return (
    <div>
      <div className='topnav-container' >
        <input type='text' id='search-box' placeholder='Search' />
        <FontAwesomeIcon icon='fa-solid fa-gear' className='clickable-icon' onClick={handleToggle} />
      </div>
      <TreeNav />
    </div>
  );
};
