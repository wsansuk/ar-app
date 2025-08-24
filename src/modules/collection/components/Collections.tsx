import { AppStationButton } from "@/components/common/AppStationButton";

export const Collections = () => {
  return (
    <div className="w-full aspect-square border mt-4 relative">
      <AppStationButton
        src="/station/station-1.png"
        href="/station/0"
        className="top-10 left-[30px]"
      />
      <AppStationButton
        src="/station/station-2.png"
        href="/station/1"
        className="bottom-10 left-[90px]"
      />
      <AppStationButton
        src="/station/station-3.png"
        href="/station/2"
        className="top-10 left-[150px]"
      />
      <AppStationButton
        src="/station/station-4.png"
        href="/station/3"
        className="bottom-10 left-[210px]"
      />
      <AppStationButton
        src="/station/station-5.png"
        href="/station/4"
        className="top-10 left-[270px]"
      />
    </div>
  );
};
