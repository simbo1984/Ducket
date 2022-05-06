import Dexie from "dexie";

export const db = new Dexie('DucketDB');
db.version(1).stores({
    sources: 'id, sourceName, organization, project, repo, filepath, pat, url',
    links: '++id, sourceId, elementId, name',
});