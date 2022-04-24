import { Mongo } from 'meteor/mongo';

export const SourcesCollection = new Mongo.Collection('sources');

export function UpdateSource(sourceId , sourceObject) {

    SourcesCollection.update({_id: sourceId}, {
        $set: {
            sourceName: sourceObject.sourceName,
            organization: sourceObject.organization,
            project: sourceObject.project,
            repo: sourceObject.repo,
            filepath: sourceObject.filepath,
            pat: sourceObject.pat,
            url: sourceObject.url,
            modifiedAt: new Date()
        }
    });
}

export function InsertSource(sourceObject, url, sourceId) {

    let doc = sourceObject;
    doc._id = sourceId;
    doc.url = url;
    doc.createdAt = new Date();
    doc.modifiedAt = new Date();

    SourcesCollection.insert(doc);
}