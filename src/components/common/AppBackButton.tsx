"use client";

import { useRouter } from "next/navigation";

import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import React from "react";

interface AppBackButtonProps {
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}

export const AppBackButton = ({
  variant = "outline",
}: React.ComponentProps<"button"> & AppBackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      size="icon"
      variant={variant}
      onClick={() => router.back()}
      className="relative"
    >
      <ChevronLeftIcon className="text-foreground" />
    </Button>
  );
};
