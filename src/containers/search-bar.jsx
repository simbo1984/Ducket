import React, { useState, useEffect } from 'react';
import { _searchText, _setSearchText } from './tree-nav';

export let _searchMode;
export let _setSearchMode;

export const SearchBar = () => {

    const [searchMode, setSearchMode] = useState('none')

    useEffect(() => {
        _setSearchMode = setSearchMode;
    });

    _searchMode = searchMode;

    return (
        <div className='search-container' style={{ display: searchMode }} >
            <input type='text' id='search-box' placeholder='Search' onChange={(e) => _setSearchText(e.target.value)} />
        </div>
    );  
}
