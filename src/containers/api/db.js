import Dexie from "dexie";

export const db = new Dexie('DucketDB');

db.version(1).stores({
    sources: 'id, sourceName, organization, project, repo, filepath, url',
    links: '++id, sourceId, elementId, name',
});