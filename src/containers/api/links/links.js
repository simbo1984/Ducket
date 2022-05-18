import { db } from "../db";

export async function InsertLinks(links, sourceId) {

    try {

        const completeLinks = links.map(link => {
            link.sourceId = sourceId;
            link.createdAt = new Date();
            return link;
        });

        await db.links.bulkAdd(completeLinks);

    } catch (error) {

        console.error(`Failed to add links from source ${sourceId} to database: ${error}`);

    }

}

export async function UpsertLinks(links, sourceId) {

    try {

        const completeLinks = links.map(link => {
            link.sourceId = sourceId;
            link.createdAt = new Date();
            return link;
        });

        await db.links.where('sourceId').equalsIgnoreCase(sourceId).delete();
        await db.links.bulkAdd(completeLinks);

    } catch (error) {

        console.error(`Failed to upsert links from source ${sourceId} to database: ${error}`);
        
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