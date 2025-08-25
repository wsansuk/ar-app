"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import AnimatedContent from "@/components/blocks/Animations/AnimatedContent/AnimatedContent";
import { HomeCarousel } from "@/modules/home/components/HomeCarousel";
import { Button } from "@/components/ui/button";

export default function Home() {
  const username = useReadLocalStorage<string>("wd_ar_workshop");

  const next_link = useMemo(() => {
    if (username) {
      return "/collection";
    } else {
      return "/register";
    }
  }, [username]);

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
        <HomeCarousel />
      </AnimatedContent>
      <div className="flex justify-end pr-1 mt-4 relative z-50">
        <Button asChild>
          <Link href={next_link}>Getting Started</Link>
        </Button>
      </div>
    </div>
  );
}
