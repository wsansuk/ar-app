"use client";

import { useRouter } from "next/navigation";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AppHomeButton = () => {
  const router = useRouter();

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => router.push("/collection")}
      className="relative"
    >
      <HomeIcon className="text-foreground" />
    </Button>
  );
};
