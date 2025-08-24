"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import AnimatedContent from "@/components/blocks/Animations/AnimatedContent/AnimatedContent";
import { AppBackButton } from "@/components/common/AppBackButton";
import { AppHomeButton } from "@/components/common/AppHomeButton";
import { CoinsIcon, UserIcon } from "lucide-react";

interface AppHeaderProps {
  username?: string;
}

export const AppHeader = ({ username }: AppHeaderProps) => {
  const pathname = usePathname();

  const ActionButton = useMemo(
    () => (pathname == "/collection" ? <AppHomeButton /> : <AppBackButton />),
    [pathname]
  );

  return (
    <AnimatedContent
      distance={150}
      direction="horizontal"
      reverse={false}
      duration={0.5}
      ease="power3.out"
      animateOpacity
      scale={1}
      threshold={0.2}
      delay={0.2}
    >
      <div className="flex items-center bg-secondary/50 border rounded-lg p-2">
        {ActionButton}
        <div className="flex items-center font-semibold ml-2">
          <UserIcon className="size-4 mt-0.5 mr-1" />
          <p>{username}</p>
        </div>
        <div className="flex items-center font-semibold ml-auto text-xs bg-cyan-500/40 p-1.5 px-2 rounded">
          <CoinsIcon className="size-4 mt-0.5 mr-1" />
          <p>Point</p>
        </div>
      </div>
    </AnimatedContent>
  );
};
