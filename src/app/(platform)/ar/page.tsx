"use client";
import { notFound } from "next/navigation";
import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";

const ArPage = () => {
  const username = useReadLocalStorage<string>("wd_ar_workshop");

  if (!username) notFound();

  const [isAcknowledge, setIsAcknowledge] = useLocalStorage(
    "wd_ar_acknowledge",
    false
  );

  // if (!isAcknowledge) {
  //   return <div>Instruction</div>;
  // }
  return (
    <div>
      {/* iframe */}
      <iframe
        src={`https://web-ar-app-ashy.vercel.app?username=${username}`}
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
