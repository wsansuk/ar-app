"use client";

import { trpc } from "@/app/_trpc/client";
import { AppStationButton } from "@/components/common/AppStationButton";

interface CollectionsProps {
  username: string;
}

export const Collections = ({ username }: CollectionsProps) => {
  const { data } = trpc.activities.getAllRegisteredStation.useQuery({
    userName: username,
  });

  return (
    <div className="w-full aspect-square border mt-4 relative">
      <AppStationButton
        src="/station/station-1.png"
        href="/station/0"
        className="top-10 left-[30px]"
        isActive={!!data?.station1}
      />
      <AppStationButton
        src="/station/station-2.png"
        href="/station/1"
        className="bottom-10 left-[90px]"
        isActive={!!data?.station2}
      />
      <AppStationButton
        src="/station/station-3.png"
        href="/station/2"
        className="top-10 left-[150px]"
        isActive={!!data?.station3}
      />
      <AppStationButton
        src="/station/station-4.png"
        href="/station/3"
        className="bottom-10 left-[210px]"
        isActive={!!data?.station4}
      />
      <AppStationButton
        src="/station/station-5.png"
        href="/station/4"
        className="top-10 left-[270px]"
        isActive={!!data?.station5}
      />
    </div>
  );
};
