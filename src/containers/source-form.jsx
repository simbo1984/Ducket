import React, { useEffect, useState } from 'react';
import { GetAndUpsertSource } from '../containers/api/ado';

export let _setSourceName;
export let _setOrganization;
export let _setProject;
export let _setRepo;
export let _setFilePath;
export let _setPat;
export let _setEditedSource;
export let _displayType;
export let _setDisplayType;

export const SourceForm = () => {

    const [sourceName, setSourceName] = useState("");
    const [organization, setOrganization] = useState("");
    const [project, setProject] = useState("");
    const [repo, setRepo] = useState("");
    const [filepath, setFilepath] = useState("");
    const [pat, setPat] = useState("");
    const [editedSource, setEditedSource] = useState({
        isEditMode: false,
        id: ""
    });
    const [displayType, setDisplayType] = useState('none');

    useEffect(() => {
        _setSourceName = setSourceName;
        _setOrganization = setOrganization;
        _setProject = setProject;
        _setRepo = setRepo;
        _setFilePath = setFilepath;
        _setPat = setPat;
        _setEditedSource = setEditedSource;
        _displayType = displayType;
        _setDisplayType = setDisplayType;
    })

    function clean() {
        setSourceName("");
        setOrganization("");
        setProject("");
        setRepo("");
        setFilepath("");
        setPat("");
        setEditedSource({ isEditMode: false, id: "" });

        setDisplayType('none');
    }

    const handleSubmit = e => {

        e.preventDefault();

        if (!sourceName || !organization || !project || !repo || !filepath || !pat) {
            clean();
            return;
        }
        let sourceObject = {
            sourceName: sourceName.trim(),
            organization: organization.trim(),
            project: project.trim(),
            repo: repo.trim(),
            filepath: filepath.trim(),
            pat: pat.trim(),
        }

        GetAndUpsertSource(sourceObject, editedSource);
        clean();
    }

    return (
        <form  id='source-form' style={{ display: displayType }} onSubmit={handleSubmit}>
            <div className='form-group'>
                <span>Name</span>
                <input type="text" maxLength="28" className='form-field' value={sourceName} onChange={(e) => _setSourceName(e.target.value)} required />
            </div>

            <div className='form-group'>
                <span>Organization Name</span>
                <input type="text" className='form-field' value={organization} onChange={(e) => _setOrganization(e.target.value)} required />
            </div>
            
            <div className='form-group'>
                <span>Project Name/ID</span>
                <input type="text" className='form-field' value={project} onChange={(e) => setProject(e.target.value)} required />
            </div>

            <div className='form-group'>
                <span>Repo Name/ID</span>
                <input type="text" className='form-field' value={repo} onChange={(e) => setRepo(e.target.value)} required />
            </div>
            
            <div className='form-group'>
                <span>Filepath</span>
                <input type="text" className='form-field' value={filepath} onChange={(e) => setFilepath(e.target.value)} required />
            </div>

            <div className='form-group'>
                <span>Personal Access Token</span>
                <input type="password" className='form-field' value={pat} onChange={(e) => setPat(e.target.value)} required />
            </div>

            <button type="submit" id='submit-button'>Set Source</button>
        </form>
    );
};