import React, { useState } from 'react';
import * as setters from './source-form';
import { RemoveSource } from '../containers/api/sources/sources';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Source = ({ source }) => {

    const [sourceState, setSourceState] = useState(null);

    chrome.storage.local.get('usedSource', result => {
        if (result.usedSource === source.id) {
            setSourceState(source.id);
        } else {
            setSourceState(null);
        }
    });

    const handleEdit = e => {

        e.preventDefault();

        setters._setEditedSource({ isEditMode: true, id: source.id })
        setters._setSourceName(source.sourceName);
        setters._setOrganization(source.organization);
        setters._setProject(source.project);
        setters._setRepo(source.repo);
        setters._setFilePath(source.filepath);
        setters._setPat(source.pat);

    }

    const handleDelete = e => {

        e.preventDefault();

        RemoveSource(source.id);


    }

    const handleSelect = e => {

        e.preventDefault();

        chrome.storage.local.set({ usedSource: source.id });
        setSourceState(source.id);
    }

    let checkIcon;
    if (sourceState === source.id) {

        checkIcon = <FontAwesomeIcon icon='fa-regular fa-square-check' className='clickable-icon' id='select-source' onClick={handleSelect} />

    } else {

        checkIcon = <FontAwesomeIcon icon='fa-regular fa-square' className='clickable-icon' id='select-source' onClick={handleSelect} />

    };

    return (
        <div id='source-container'>
            <div id='source-name'>{source.sourceName}</div>
            {checkIcon}
            <FontAwesomeIcon icon='fa-solid fa-pen' className='clickable-icon' id='edit-source' onClick={handleEdit} />
            <FontAwesomeIcon icon='fa-solid fa-trash-can' className='clickable-icon' id='delete-source' onClick={handleDelete} />
        </div>
    );
}