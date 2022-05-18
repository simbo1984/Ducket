import { db } from '../../containers/api/db';
import { GetAndUpsertSource } from '../../containers/api/ado';

chrome.runtime.onInstalled.addListener(() => {
    scheduleFetch();
    startFetch();
});

chrome.runtime.onStartup.addListener(() => {
    startFetch();
});

chrome.alarms.onAlarm.addListener(() => {
    startFetch();
});

function scheduleFetch() {
    console.log('Scheduling fetch alarm to 5 minutes.');
    chrome.alarms.create({ periodInMinutes: 5 });
};

function startFetch() {
    db.sources.toArray(sources => {
        sources.forEach(source => {
           GetAndUpsertSource(source, {isEditMode: true, id: source.id});
        });
    });
};