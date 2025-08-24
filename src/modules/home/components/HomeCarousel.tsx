import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { COMPANY_VALUES } from "@/config";

export const HomeCarousel = () => {
  return (
    <Carousel
      className="w-full"
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {COMPANY_VALUES.map((data, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="relative overflow-hidden">
                <CardContent className="aspect-square">
                  <h2 className="text-2xl font-bold text-cyan-300">
                    {data.title}
                  </h2>
                  <p className="text-muted-foreground">{data.description}</p>
                  <ul className="space-y-2 mt-4">
                    {data.details.map((detail, index) => (
                      <li
                        key={`detail-${data.title}-${index}}`}
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
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
