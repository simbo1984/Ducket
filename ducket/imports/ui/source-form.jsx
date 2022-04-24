import React, { useEffect, useState } from 'react';
import { GetAndUpsertSource } from '../api/ado';

export let _setSourceName;
export let _setOrganization;
export let _setProject;
export let _setRepo;
export let _setFilePath;
export let _setPat;
export let _setEditedSource;

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
        }
    );

    useEffect(() => {
        _setSourceName = setSourceName;
        _setOrganization = setOrganization;
        _setProject = setProject;
        _setRepo = setRepo;
        _setFilePath = setFilepath;
        _setPat = setPat;
        _setEditedSource = setEditedSource;
    })

    function clean() {
        setSourceName("");
        setOrganization("");
        setProject("");
        setRepo("");
        setFilepath("");
        setPat("");
        setEditedSource({isEditMode: false, id: ""});
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
        <form className="source-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name of source"
                value={sourceName}
                onChange={(e) => _setSourceName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Organization name"
                value={organization}
                onChange={(e) => _setOrganization(e.target.value)}
            />
            <input
                type="text"
                placeholder="Project name/ID"
                value={project}
                onChange={(e) => setProject(e.target.value)}
            />
            <input
                type="text"
                placeholder="Repo name/ID"
                value={repo}
                onChange={(e) => setRepo(e.target.value)}
            />
            <input
                type="text"
                placeholder="Filepath from the root"
                value= {filepath}
                onChange={(e) => setFilepath(e.target.value)}
            />
            <input
                type="password"
                placeholder="Personal access token"
                value={pat}
                onChange={(e) => setPat(e.target.value)}
            />

            <button type="submit">Set Source</button>
        </form>
    );
};