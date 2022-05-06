import React from 'react';
import * as setters from './source-form';
import { RemoveSource } from '../containers/api/sources/sources';

export const Source = ({ source }) => {

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

        RemoveSource(source.id)

    }

    return (
        <div className='source-container'>
            <div className='source-name'>{source.sourceName}</div>
            <div className='button' onClick={handleEdit}>E</div>
            <div className='button' onClick={handleDelete}>D</div>
        </div>
    );
}