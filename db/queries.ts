import { cache } from "react";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { courses, userProgress } from "@/db/schema";

export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    return db.query.userProgress.findFirst({
       where: eq(userProgress.userId, userId),
       with: {
           activeCourse: true,
       },
    });
});

export const getCourses = cache(async () => db.query.courses.findMany());

export const getCourseById = cache(async (courseId: number) => {
    return db.query.courses.findFirst({
        where: eq(courses.id, courseId),
    });
});