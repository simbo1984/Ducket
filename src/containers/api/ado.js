import { Buffer } from 'buffer';
import { ParseMarkdown } from './links/methods';
import { InsertSource, UpdateSource } from './sources/sources';
import { _setError } from '../banner';
import * as CryptoJS from 'crypto-js'

const BASE_URL = 'https://dev.azure.com/'
const API_VERSION = 'api-version=7.1-preview.1'

export async function GetAndUpsertSource(sourceObject, editedSource) {

    if (editedSource.isEditMode) {
        let bytes = CryptoJS.AES.decrypt(sourceObject.pat, process.env.KEY);
        sourceObject.pat = bytes.toString(CryptoJS.enc.Utf8);
    }

    const org = sourceObject.organization;
    const proj = sourceObject.project;
    const repo = sourceObject.repo;
    const path = sourceObject.filepath;
    const uri = `${org}/${proj}/_apis/git/repositories/${repo}/items?path=${path}`

    const url = BASE_URL.concat(uri, '&', API_VERSION);
    const token = CreateAuthToken(sourceObject.pat);

    const requestInfo = {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Accept': 'text/markdown',
            'Credentials': 'omit'
        }
    };

    fetch(url, requestInfo).then(response => {
        if (response.status === 200) {
            response.text().then(text => {

                if (!editedSource.isEditMode) {
                    let sourceId = ParseMarkdown(text, null);
                    InsertSource(sourceObject, url, sourceId);

                } else {
                    let sourceId = ParseMarkdown(text, editedSource.id);
                    UpdateSource(sourceId, sourceObject)
                };
            });

        } else {
            console.error(response.status);
            _setError({
                message: `${response.status}: An error occured with the request.`,
                type: 'negative',
                timeLeft: 10
            });
        };
    }).catch(error => {
        console.error(error);
        _setError({
            message: `An error occured: ${error}`,
            type: 'negative',
            timeLeft: 10
        });
    });
}

function CreateAuthToken(pat) {

    const _pat = ':' + pat;
    const token = 'Basic ' + Buffer.from(_pat).toString('base64');

    return token;
}