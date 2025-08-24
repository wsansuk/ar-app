import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface AppStationButtonProps {
  href: string;
  src: string;
  isActive?: boolean;
}

export const AppStationButton = ({
  href,
  src,
  className,
  isActive,
}: React.ComponentProps<"button"> & AppStationButtonProps) => {
  return (
    <Link
      href={href}
      className={cn("absolute", className)}
    >
      <Image
        src={src}
        alt="station-1"
        objectFit="contain"
        width={35}
        height={0}
        className={cn(isActive ? "" : "grayscale")}
      />
    </Link>
  );
};
