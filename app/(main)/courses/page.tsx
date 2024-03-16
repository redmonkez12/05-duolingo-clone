import { getCourses } from "@/db/queries";
import { List } from "@/app/(main)/courses/list";

export default async function CoursesPage() {
    const data = await getCourses();

    return (
        <div className="h-full max-w-[912px] px-3 max-auto">
            <h1 className="text-2xl font-bold text-neutral-700">
                Language courses
            </h1>
            <List
                courses={data}
                activeCourseId={1}
            />
        </div>
    );
}