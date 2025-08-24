import Link from "next/link";
import { QrCodeIcon } from "lucide-react";

export const AppQrButton = () => {
  return (
    <Link
      href="/ar"
      className="flex flex-col items-center bg-secondary/40 rounded-md border py-4"
    >
      <QrCodeIcon className="size-10 text-cyan-300" />
      <span className="font-semibold">Scan Qr Code</span>
    </Link>
  );
};
