import { cache } from "react";

import db from "@/db/drizzle";

export const getCourses = cache(async () => db.query.courses.findMany());