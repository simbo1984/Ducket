// service worker

// chrome.runtime.onInstalled.addListener(() => {



//     var db;
//     var request = indexedDB.open("Ducket");
//     request.onerror = event => {
//         console.error("Database error: " + event.target.errorCode);
//     };
//     request.onupgradeneeded = event => {
//         db = event.target.result;

//         var sourcesStore = db.createObjectStore("sources", { autoIncrement: true });

//         sourcesStore.createIndex("sourceName", "sourceName", { unique: true });
//         sourcesStore.createIndex("organization", "organization", { unique: false });
//         sourcesStore.createIndex("project", "project", { unique: false });
//         sourcesStore.createIndex("repo", "repo", { unique: false });
//         sourcesStore.createIndex("filepath", "filepath", { unique: false });
//         sourcesStore.createIndex("pat", "pat", { unique: false });
//         sourcesStore.createIndex("url", "url", { unique: false });
//         sourcesStore.createIndex("createdAt", "createdAt", { unique: false });
//         sourcesStore.createIndex("modifiedAt", "modifiedAt", { unique: false });

//         var linksStore = db.createObjectStore("links", { autoIncrement: true });

//         linksStore.createIndex("sourceId", "sourceId", { unique: false });
//         linksStore.createIndex("elementId", "elementId", { unique: false });
//         linksStore.createIndex("parentId", "parentId", { unique: false });
//         linksStore.createIndex("level", "level", { unique: false });
//         linksStore.createIndex("name", "name", { unique: false });
//         linksStore.createIndex("url", "url", { unique: false });
//         linksStore.createIndex("createdAt", "createdAt", { unique: false });
//         linksStore.createIndex("modifiedAt", "modifiedAt", { unique: false });
//     };

// })