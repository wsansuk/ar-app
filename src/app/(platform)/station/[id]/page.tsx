"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import { AppHeader } from "@/components/common/AppHeader";
import AnimatedContent from "@/components/blocks/Animations/AnimatedContent/AnimatedContent";

import { COMPANY_VALUES } from "@/config";
import { useReadLocalStorage } from "usehooks-ts";
import { ValueCard } from "@/modules/station/components/ValueCard";
import { AppQrButton } from "@/components/common/AppQrButton";

const StationPage = () => {
  const { id } = useParams();
  const username = useReadLocalStorage<string>("wd_ar_workshop");
  const router = useRouter();

  if (!username) router.push("/register");

  const data = COMPANY_VALUES[Number(id)];

  if (!data) return notFound();

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
            <ValueCard
              title={data.title}
              description={data.description}
              details={data.details}
            />
          </div>
        </div>
      </AnimatedContent>
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
        <AppQrButton />
      </AnimatedContent>
    </div>
  );
};

export default StationPage;
