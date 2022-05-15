import React from 'react';
import * as setters from './source-form';
import { RemoveSource } from '../containers/api/sources/sources';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { _setUsedSource } from '../pages/Popup/Popup'

export const Source = ({ source, usedSource }) => {

    const handleEdit = e => {

        e.preventDefault();

        if (setters._displayType === 'none') {

            setters._setEditedSource({ isEditMode: true, id: source.id })
            setters._setSourceName(source.sourceName);
            setters._setOrganization(source.organization);
            setters._setProject(source.project);
            setters._setRepo(source.repo);
            setters._setFilePath(source.filepath);
            setters._setPat(source.pat);

            setters._setDisplayType('flex');
        } else {

            setters._setEditedSource({ isEditMode: false, id: source.id })
            setters._setSourceName("");
            setters._setOrganization("");
            setters._setProject("");
            setters._setRepo("");
            setters._setFilePath("");
            setters._setPat("");

            setters._setDisplayType('none');
        }
    }

    const handleDelete = e => {

        e.preventDefault();

        RemoveSource(source.id);

    }

    const handleSelect = e => {

        e.preventDefault();

        chrome.storage.local.set({ usedSource: source.id });
        _setUsedSource(source.id);
    }

    let checkIcon;
    if (usedSource === source.id) {

        checkIcon = <FontAwesomeIcon icon='fa-regular fa-square-check' className='clickable-icon' id='select-source' onClick={handleSelect} />

    } else {

        checkIcon = <FontAwesomeIcon icon='fa-regular fa-square' className='clickable-icon' id='select-source' onClick={handleSelect} />

    };

    return (
        <div id='source-container'>
            <FontAwesomeIcon icon='fa-solid fa-bucket' className='non-clickable-icon' />
            <div id='source-name'>{source.sourceName}</div>
            {checkIcon}
            <FontAwesomeIcon icon='fa-solid fa-pen' className='clickable-icon' id='edit-source' onClick={handleEdit} />
            <FontAwesomeIcon icon='fa-solid fa-trash-can' className='clickable-icon' id='delete-source' onClick={handleDelete} />
        </div>
    );
}