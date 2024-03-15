import Image from "next/image";

export default function MarketingPage() {
    return (
        <div className="max-w-[988px] max-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center
            p-4 gap-2
        ">
            <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
                <Image src="/hero.svg" fill alt="Hero"/>
            </div>
        </div>
    );
}