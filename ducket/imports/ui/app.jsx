import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { SourcesCollection } from '/imports/api/sources/sources';
import { Source } from './source';
import { SourceForm } from './source-form';
import { TreeNav } from './tree-nav';


export const App = () => {
  
  const [isSetupMode, setIsSetupMode] = useState(true);
  const sources = useTracker(() => SourcesCollection.find({}).fetch());

  function handleToggle(e) {
    
    isSetupMode ? setIsSetupMode(false) : setIsSetupMode(true);

  }

  if (isSetupMode) {
    return (
      <div>
        <h1>Ducket Setup</h1>
        <SourceForm/>
        { sources.map(source => <Source key={ source._id } source={ source }/>) }
        <div className='toggle-button' onClick={handleToggle}>Toggle</div>
      </div>
    );
  }

  return (
    <div>
      <h1>Bookmarks</h1>
      <TreeNav/>
      <div className='toggle-button' onClick={handleToggle}>Toggle</div>
    </div>
  );

}