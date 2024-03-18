import { PropsWithChildren } from "react";

export default function LessonLayout({ children }: PropsWithChildren ) {
    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col h-full w-full">
                {children}
            </div>
        </div>
    );
}