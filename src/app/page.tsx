"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import AnimatedContent from "@/components/blocks/Animations/AnimatedContent/AnimatedContent";
import { HomeCarousel } from "@/modules/home/components/HomeCarousel";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("wd_ar_workshop");
        setUsername(stored);
      } catch (err) {
        console.warn("localStorage unavailable", err);
        setUsername(null);
      }
    }
  }, []);

  const handleClick = () => {
    if (username) {
      router.push("/collection");
    } else {
      router.push("/register");
    }
  };

  return (
    <div className="p-4 flex flex-col w-full h-screen justify-center">
      <AnimatedContent
        {...{
          distance: 150,
          direction: "horizontal",
          reverse: false,
          duration: 0.75,
          ease: "power3.out",
          initialOpacity: 0,
          animateOpacity: true,
          threshold: 0.2,
          delay: 0.2,
        }}
      >
        <HomeCarousel />
      </AnimatedContent>

      <AnimatedContent
        {...{
          distance: 150,
          direction: "horizontal",
          reverse: false,
          duration: 0.75,
          ease: "power3.out",
          initialOpacity: 0,
          animateOpacity: true,
          threshold: 0.2,
          delay: 0.2,
        }}
      >
        <div className="flex justify-end pr-1 mt-4 relative z-10">
          <Button onClick={handleClick}>Getting Started</Button>
        </div>
      </AnimatedContent>
    </div>
  );
}
