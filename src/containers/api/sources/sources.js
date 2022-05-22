import { db } from "../db";
import { RemoveLinksFromSource } from "../links/links";
import * as CryptoJS from 'crypto-js'

export async function UpdateSource(sourceId, sourceObject) {

    try {

        await db.sources.update(sourceId, {
            sourceName: sourceObject.sourceName,
            organization: sourceObject.organization,
            project: sourceObject.project,
            repo: sourceObject.repo,
            filepath: sourceObject.filepath,
            pat: CryptoJS.AES.encrypt(sourceObject.pat, process.env.KEY).toString(),
            url: sourceObject.url,
            modifiedAt: new Date()
        })

    } catch (error) {

        console.error(`Failed to update ${sourceObject.sourceName} of database: ${error}`);

    }

}

export async function InsertSource(sourceObject, url, sourceId) {

    try {

        let obj = sourceObject;
        obj.id = sourceId;
        obj.url = url;
        obj.pat = CryptoJS.AES.encrypt(obj.pat, process.env.KEY).toString();
        obj.createdAt = new Date();
        obj.modified = new Date();

        await db.sources.add(obj);

    } catch (error) {

        console.error(`Failed to add ${sourceObject.sourceName} to database: ${error}`);

    }


}

export async function RemoveSource(sourceId) {

    try {

        await db.sources.delete(sourceId);
        await RemoveLinksFromSource(sourceId);
        chrome.storage.local.get(['usedSource'], result => {
            if (result.usedSource === sourceId) {
                chrome.storage.local.set({ usedSource: null })
            };
        });

    } catch (error) {

        console.error(`Failed to remove ${sourceObject.sourceName} from database: ${error}`);

    }

}