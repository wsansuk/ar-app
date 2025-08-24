"use client";

import { useRouter } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";
import { BookCheckIcon } from "lucide-react";

import AnimatedContent from "@/components/blocks/Animations/AnimatedContent/AnimatedContent";

import { AppHeader } from "@/components/common/AppHeader";
import { Collections } from "@/modules/collection/components/Collections";

const CollectionPage = () => {
  const router = useRouter();
  const username = useReadLocalStorage<string>("wd_ar_workshop");

  if (!username) router.push("/register");

  return (
    <div className="p-4 space-y-4">
      <AppHeader username={username!} />
      <AnimatedContent
        distance={150}
        direction="horizontal"
        reverse={false}
        duration={0.5}
        ease="power3.out"
        animateOpacity
        scale={1}
        threshold={0.2}
        delay={0.4}
      >
        <div className="bg-secondary/50 p-4 rounded-lg border">
          <div className="flex items-center">
            <BookCheckIcon className="mr-2" />
            <h1 className="text-lg font-semibold">Collection</h1>
          </div>
          <Collections />
        </div>
      </AnimatedContent>
    </div>
  );
};

export default CollectionPage;
