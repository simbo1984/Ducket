import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { _searchMode, _setSearchMode } from './search-bar';
import { _setIsSetupMode } from '../pages/Popup/Popup';
import { _setSearchText } from './tree-nav';
import  * as sourceForm from './source-form';

export const TopNav = ({isSetupMode}) => {

  function handleTooltip(e) {
    var tooltips = document.querySelectorAll('.toolbar-icon span')
    var x = (e.clientX + 15) + 'px',
        y = (e.clientY + 10) + 'px';
    for (var i = 0; i < tooltips.length; i++) {
      tooltips[i].style.top = y;
      tooltips[i].style.left = x;
    }
  }

  function handleToggle(e) {

    e.preventDefault()

    isSetupMode ? _setIsSetupMode(false) : _setIsSetupMode(true);

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
      <div className='topnav-container'>
        <div className='toolbar-icon' 
          id='add-source' 
          onClick={handleAdd} 
          onMouseMove={handleTooltip}>
          <FontAwesomeIcon icon='fa-solid fa-square-plus'/>
          <span>New source</span>
        </div>
        <div className='toolbar-icon' 
          id='go-to-bookmarks' 
          onClick={handleToggle} 
          onMouseMove={handleTooltip}>
          <FontAwesomeIcon icon='fa-solid fa-book-bookmark'/>
          <span>Bookmarks</span>
        </div>
        <div className='toolbar-icon' 
          id='github-profile' 
          onClick={handleGitHub} 
          onMouseMove={handleTooltip}>
          <FontAwesomeIcon icon='fa-brands fa-github'/>
          <span>About Ducket</span>
        </div>
      </div>
    );
  } else {
    return (      
      <div className='topnav-container' >
        <div className='toolbar-icon' 
          id='search' 
          onClick={handleSearch} 
          onMouseMove={handleTooltip}>
          <FontAwesomeIcon icon='fa-solid fa-magnifying-glass'/>
          <span>Search</span>
        </div>
        <div className='toolbar-icon' 
          id='go-to-options' 
          onClick={handleToggle} 
          onMouseMove={handleTooltip}>
          <FontAwesomeIcon icon='fa-solid fa-gear'/>
          <span>Options</span>
        </div>
        <div className='toolbar-icon' 
          id='github-profile' 
          onClick={handleGitHub} 
          onMouseMove={handleTooltip}>
          <FontAwesomeIcon icon='fa-brands fa-github'/>
          <span>About Ducket</span>
        </div>
      </div>
    );
  }

}
