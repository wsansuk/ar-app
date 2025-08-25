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
      {/* ✅ HomeCarousel 1 */}
      <div className="pointer-events-none">
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
          <div className="pointer-events-auto">
            <HomeCarousel />
          </div>
        </AnimatedContent>
      </div>

      {/* ✅ HomeCarousel 2 */}
      <div className="pointer-events-none">
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
          <div className="pointer-events-auto">
            <HomeCarousel />
          </div>
        </AnimatedContent>
      </div>

      {/* ✅ ปุ่ม Get Started */}
      <div className="pointer-events-none mt-4">
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
          <div className="flex justify-end pr-1 relative z-50 pointer-events-auto">
            <Button asChild>
              <Link href={next_link}>Getting Started</Link>
            </Button>
          </div>
        </AnimatedContent>
      </div>
    </div>
  );
}
