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
        <form class='form__group field' id='source-form' style={{ display: displayType }} onSubmit={handleSubmit}>
            <input
                className='form__field'
                type="text"
                name='name'
                placeholder="Name"
                maxLength="28"
                value={sourceName}
                onChange={(e) => _setSourceName(e.target.value)}
                required
            /><label for='Name' className='form__label'>Name</label>
            <input
                className='form__field'
                type="text"
                name='organizationName'
                placeholder="Organization name"
                value={organization}
                onChange={(e) => _setOrganization(e.target.value)}
                required
            /><label for='organizationName' className='form__label'>Organization Name</label>
            <input
                className='form__field'
                type="text"
                name='projectId'
                placeholder="Project name/ID"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                required
            /><label for='projectId' className='form__label'>Project Name/ID</label>
            <input
                className='form__field'
                type="text"
                name='repoId'
                placeholder="Repo name/ID"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
                required
            /><label for='repoId' className='form__label'>Repo Name/ID</label>
            <input
                className='form__field'
                type="text"
                name='filepath'
                placeholder="Filepath from root (i.e. /example/file.md)"
                value={filepath}
                onChange={(e) => setFilepath(e.target.value)}
                required
            /><label for='filepath' className='form__label'>Filepath</label>
            <input
                className='form__field'
                type="password"
                name='pat'
                placeholder="Personal access token"
                value={pat}
                onChange={(e) => setPat(e.target.value)}
                required
            /><label for='pat' className='form__label'>Personal Access Token</label>

            <button type="submit">Set Source</button>
        </form>
    );
};