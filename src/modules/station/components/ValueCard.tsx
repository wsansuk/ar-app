import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface ValueCardProps {
  title?: string;
  description?: string;
  details?: string[];
}

export const ValueCard = ({ details, description, title }: ValueCardProps) => {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="aspect-square">
        <h2 className="text-2xl font-bold text-cyan-300">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
        <ul className="space-y-2 mt-4">
          {details?.map((detail, index) => (
            <li
              key={`detail-${title}-${index}}`}
              className="p-2 border text-sm rounded bg-secondary"
            >
              {detail}
            </li>
          ))}
        </ul>
      </CardContent>
      <div className="w-[150px] h-[150px] absolute bottom-0 right-0 mask-t-from-50% mask-l-from-20%">
        <Image
          layout="fill"
          className="h-full object-[67%] opacity-50"
          objectFit="cover"
          alt="TPE Logo"
          src="/assets/TPE-Logo.png"
        />
      </div>
    </Card>
  );
};
