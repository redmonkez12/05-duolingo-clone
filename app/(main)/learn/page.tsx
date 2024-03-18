import { redirect } from "next/navigation";

import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/FeedWrapper";
import { Header } from "@/app/(main)/learn/header";
import { UserProgress } from "@/components/user-progress";
import { getUnits, getUserProgress } from "@/db/queries";

export default async function LearnPage() {
    const unitsData = getUnits();
    const userProgressData = getUserProgress();

    const [userProgress, units] = await Promise.all([userProgressData, unitsData]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title}/>
                {units.map(unit => (
                    <div key={unit.id} className="mb-10">
                        {JSON.stringify(unit)}
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
}