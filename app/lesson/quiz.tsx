"use client";

import { useState } from "react";
import { challenges, challengeOptions } from "@/db/schema";
import { Header } from "@/app/lesson/header";


type Props ={
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any;
};


export function Quiz({
                         initialLessonChallenges,
                         initialLessonId,
                         initialPercentage,
                         initialHearts,
                         userSubscription
                     }: Props) {
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialHearts);

    return (
        <Header
            hearts={hearts}
            percentage={percentage}
            hasActiveSubscription={!!userSubscription?.isActive}
        />
    );
}