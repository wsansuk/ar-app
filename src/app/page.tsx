"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import AnimatedContent from "@/components/blocks/Animations/AnimatedContent/AnimatedContent";
import { HomeCarousel } from "@/modules/home/components/HomeCarousel";
import { Button } from "@/components/ui/button";

export default function Home() {
  // เคลียร์ค่า wd_ar_workshop ตอนเข้าหน้า Home
  useEffect(() => {
    localStorage.removeItem("wd_ar_workshop");
  }, []);

  const username = useReadLocalStorage<string>("wd_ar_workshop");

  const next_link = useMemo(() => {
    return username ? "/collection" : "/register";
  }, [username]);

  return (
    <>
      <div className="relative p-4 flex flex-col w-full h-screen justify-center">
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
      </div>

      {/* ปุ่มอยู่บน top layer แยก context */}
      <div className="fixed bottom-4 right-4 z-[9999]">
        <Link href={next_link}>
          <Button>Getting Started</Button>
        </Link>
      </div>
    </>
  );
}
