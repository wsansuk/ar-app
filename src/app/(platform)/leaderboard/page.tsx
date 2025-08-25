"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";
import { trpc } from "@/app/_trpc/client";
import { AppBackButton } from "@/components/common/AppBackButton";

const LeaderboardPage = () => {
  const router = useRouter();
  const adminToken = useReadLocalStorage<string>("admin_token");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!adminToken) router.push("/admin");
  }, [adminToken, router]);

  const leaderboardQuery = trpc.admin.getLeaderboard.useQuery(undefined, {
    enabled: !!adminToken,
  });

  useEffect(() => {
    if (!leaderboardQuery.isLoading) setLoading(false);
  }, [leaderboardQuery.isLoading]);

  if (!adminToken || loading) return <div className="p-4">Loading...</div>;

  const data = leaderboardQuery.data?.leaderboard || [];

  return (
    <div className="p-4 space-y-4 h-screen flex flex-col">
      <AppBackButton />

      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>

      <div className="overflow-auto border rounded-lg flex-1">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Stations Completed</th>
              <th className="border p-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, idx: number) => (
              <tr key={idx}>
                <td className="border p-2 text-center">{idx + 1}</td>
                <td className="border p-2">{item.userName}</td>
                <td className="border p-2 text-center">{item.stationCount}</td>
                <td className="border p-2">
                  {/* {item.updatedAt
                    ? (() => {
                        const d = new Date(item.updatedAt);
                        // ลบ 7 ชั่วโมง
                        d.setHours(d.getHours() - 7);
                        // แปลงเป็น string YYYY-MM-DD HH:mm:ss
                        const yyyy = d.getFullYear();
                        const mm = String(d.getMonth() + 1).padStart(2, "0");
                        const dd = String(d.getDate()).padStart(2, "0");
                        const hh = String(d.getHours()).padStart(2, "0");
                        const mi = String(d.getMinutes()).padStart(2, "0");
                        const ss = String(d.getSeconds()).padStart(2, "0");
                        return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
                      })()
                    : "-"} */}
                  {item.updatedAt || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No leaderboard data available.
        </p>
      )}
    </div>
  );
};

export default LeaderboardPage;
