import { Mongo } from 'meteor/mongo';

export const LinksCollection = new Mongo.Collection('links');

export function InsertLink(linkObject, sourceId) {

    let doc = linkObject;
    doc.sourceId = sourceId;
    doc.createdAt = new Date();
    doc.modifiedAt = new Date();

    LinksCollection.insert(doc);
}