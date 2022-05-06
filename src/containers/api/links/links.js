import { db } from "../db";

export async function InsertLink(linkObject, sourceId) {

    try {

        let obj = linkObject;
        obj.sourceId = sourceId;
        obj.createdAt = new Date();
        obj.modified = new Date();

        await db.links.add(obj);

    } catch (error) {

        console.error(`Failed to add ${linkObject.name} to database: ${error}`);

    }

}

export async function RemoveLinksFromSource(sourceId) {

    try {

        await db.links
            .where("sourceId").equalsIgnoreCase(sourceId)
            .delete()


    } catch (error) {

        console.error(`Failed to fetch ${sourceId} from database: ${error}`);

    }

}