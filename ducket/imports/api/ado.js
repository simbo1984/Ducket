import { Buffer } from 'buffer';
import { ParseMarkdown } from './links/methods';
import { InsertSource, UpdateSource } from './sources/sources';

const BASE_URL = 'https://dev.azure.com/' 
const API_VERSION = 'api-version=7.1-preview.1'

//const pat = ":h2mfzddrpd2spmbjcuntyicqfpesxvagtnyad33cyz2w6oryfgfa"

export async function GetAndUpsertSource(sourceObject, editedSource) {

    const request = new XMLHttpRequest();
    const org = sourceObject.organization;
    const proj = sourceObject.project;
    const repo = sourceObject.repo;
    const path = sourceObject.filepath;
    const uri = `${org}/${proj}/_apis/git/repositories/${repo}/items?path=${path}`

    const url = BASE_URL.concat(uri, '&', API_VERSION);

    const token = CreateAuthToken(sourceObject.pat);

    if (request) {
        request.open('GET', url, true);
        request.setRequestHeader('Authorization', token);
        request.setRequestHeader('Accept', 'text/markdown');
        request.withCredentials = false;
        request.onload = () => {
            if (request.readyState === 4) {
                if (request.status == 200) {
                    if (!editedSource.isEditMode) {
                        let sourceId = ParseMarkdown(request.response);
                        InsertSource(sourceObject, url, sourceId);
                    } else {
                        UpdateSource(editedSource.id, sourceObject)
                    }      
                } else {
                    console.error(request.statusText);
                }
            }
        };
        request.onerror = () => {
            console.error(request.statusText);
        };
        request.send(null);
    };
}

function CreateAuthToken(pat) {

    const _pat = ':' + pat;
    const token = 'Basic ' + Buffer.from(_pat).toString('base64');

    return token;

}