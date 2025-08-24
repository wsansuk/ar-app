"use client";

import { useRouter } from "next/navigation";

import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const AppBackButton = () => {
  const router = useRouter();

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => router.back()}
      className="relative"
    >
      <ChevronLeftIcon className="text-foreground" />
    </Button>
  );
};
