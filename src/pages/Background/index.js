import { GetAndUpsertSource } from '../../containers/api/ado';
import { db } from '../../containers/api/db'

function scheduleFetch() {
    console.log('Scheduling fetch alarm to 5 minutes.');
    chrome.alarms.create({ periodInMinutes: 5 });
};

chrome.runtime.onInstalled.addListener(() => {
    scheduleFetch();
});

chrome.runtime.onStartup.addListener(() => {
    startFetch();
});

chrome.alarms.onAlarm.addListener(() => {
    startFetch();
});
function startFetch() {

    console.log('Automatic fetch of sources');
    db.sources.count(count => {
        console.log(`${count} sources found. Initiating fetch for each one of them.`);
        if (count > 0) {
            db.sources.toArray(sources => {
                sources.forEach(source => {
                    GetAndUpsertSource(source, {isEditMode: true, id: source.id});
                });
            });
        }
    })

};