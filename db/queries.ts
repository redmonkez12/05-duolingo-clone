import { cache } from "react";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { courses, units, userProgress } from "@/db/schema";

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

export const getUnits = cache(async () => {
   const userProgress = await getUserProgress();

   if (!userProgress?.activeCourseId) {
       return [];
   }

   const data = await db.query.units.findMany({
      where: eq(units.courseId, userProgress.activeCourseId),
       with: {
          lessons: {
              with: {
                  challenges: {
                      with: {
                          challengeProgress: true,
                      },
                  },
              },
          },
       },
   });

    return data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            if (
                lesson.challenges.length === 0
            ) {
                return { ...lesson, completed: false };
            }

            const allCompletedChallenges = lesson.challenges.every((challenge) => {
                return challenge.challengeProgress
                    && challenge.challengeProgress.length > 0
                    && challenge.challengeProgress.every((progress) => progress.completed);
            });

            return { ...lesson, completed: allCompletedChallenges };
        });

        return { ...unit, lessons: lessonsWithCompletedStatus };
    });
});