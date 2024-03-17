import { redirect } from "next/navigation";

import { StickyWrapper } from "@/components/sticky-wrapper";
import { FeedWrapper } from "@/components/FeedWrapper";
import { Header } from "@/app/(main)/learn/header";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";

export default async function LearnPage() {
    const userProgressData = getUserProgress();

    const [userProgress] = await Promise.all([userProgressData]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={{ title: "Spanish", imageSrc: "/es.svg" }}
                    hearts={5}
                    points={100}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title="Spanish"/>
            </FeedWrapper>
        </div>
    );
}