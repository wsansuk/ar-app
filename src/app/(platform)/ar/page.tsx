"use client";
import { AppBackButton } from "@/components/common/AppBackButton";
import { notFound } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";

const ArPage = () => {
  const username = useReadLocalStorage<string>("wd_ar_workshop");
  if (!username) notFound();

  return (
    <div className="relative">
      <div className="absolute top-4 left-4">
        <AppBackButton variant="secondary" />
      </div>
      {/* iframe */}
      <iframe
        src={`https://wsansuk.github.io/web-ar-app?username=${username}`}
        frameBorder="0"
        scrolling="yes"
        seamless
        className="block w-full h-screen"
        allow="camera;gyroscope;accelerometer;magnetometer;xr-spatial-tracking;microphone;"
      ></iframe>
    </div>
  );
};

export default ArPage;
