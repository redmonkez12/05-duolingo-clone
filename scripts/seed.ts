import "dotenv/config";

import * as schema from "../db/schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);

// @ts-ignore
const db = drizzle(sql, { schema });

async function main() {
    try {
        console.log("Seeding database");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);

        await db.insert(schema.courses).values([
            {
                title: "Spanish",
                imageSrc: "/es.svg",
            },
            {
                title: "Italian",
                imageSrc: "/it.svg",
            },
            {
                title: "French",
                imageSrc: "/fr.svg",
            },
            {
                title: "Croatian",
                imageSrc: "/hr.svg",
            },
        ]);

        console.log("Seeding finished");
    } catch (e) {
        console.log(e);
        throw new Error("Failed to seed the database");
    }
}

main();
