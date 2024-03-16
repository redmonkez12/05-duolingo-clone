import { PropsWithChildren } from "react";

export function StickyWrapper({ children }: PropsWithChildren) {
    return (
        <div className="hidden lg:block w-[368px] sticky self-send bottom-6">
            <div className="min-h-[calc(100vh-48px)] sticky top-6 flex flex-col gap-y-4">
                {children}
            </div>
        </div>
    );
}