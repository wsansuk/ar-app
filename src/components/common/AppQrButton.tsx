"use client";
import { useRouter } from "next/navigation";
import { QrCodeIcon } from "lucide-react";

export const AppQrButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/ar")}
      className="flex flex-col items-center w-full bg-secondary/40 rounded-md border py-4"
    >
      <QrCodeIcon className="size-10 text-cyan-300" />
      <span className="font-semibold">Scan Qr Code</span>
    </button>
  );
};
