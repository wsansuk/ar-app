"use client";

import { useReadLocalStorage } from "usehooks-ts";

import AnimatedContent from "@/components/blocks/Animations/AnimatedContent/AnimatedContent";
import { HomeCarousel } from "@/modules/home/components/HomeCarousel";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const username = useReadLocalStorage<string>("wd_ar_workshop");

  return (
    <div className="p-4 flex flex-col w-full h-screen justify-center">
      <AnimatedContent
        distance={150}
        direction="horizontal"
        reverse={false}
        duration={0.75}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        threshold={0.2}
        delay={0.2}
      >
        <HomeCarousel />
      </AnimatedContent>
      <AnimatedContent
        distance={150}
        direction="horizontal"
        reverse={false}
        duration={0.75}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        threshold={0.2}
        delay={0.2}
      >
        <div className="flex justify-end pr-1 mt-4 relative z-[9999]">
          <Button
            onClick={() => router.push(username ? "/colleciton" : "register")}
          >
            Getting Started
          </Button>
        </div>
      </AnimatedContent>
    </div>
  );
}
