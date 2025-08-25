import db from "@/db";
import { adminUsers, activities } from "@/db/schema";
import { formatResponse } from "@/server/utils/response";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Import dayjs + plugins
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// Extend dayjs ด้วย plugin
dayjs.extend(utc);
dayjs.extend(timezone);

export const AdminProcedure = router({
  // =================== Login admin ===================
  login: publicProcedure
    .input(
      z.object({
        userName: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { userName, password } = input;

      if (!userName || !password) {
        return formatResponse(
          "admin",
          null,
          "Username and password are required",
          "0001"
        );
      }

      try {
        const [admin] = await db
          .select()
          .from(adminUsers)
          .where(eq(adminUsers.userName, userName));

        if (!admin) {
          return formatResponse(
            "admin",
            null,
            "Invalid username or password",
            "0002"
          );
        }

        const isMatch = await bcrypt.compare(password, admin.passwordHash);
        if (!isMatch) {
          return formatResponse(
            "admin",
            null,
            "Invalid username or password",
            "0002"
          );
        }

        const token = jwt.sign(
          { id: admin.id, role: "admin" },
          process.env.JWT_SECRET || "secret",
          { expiresIn: "1h" }
        );

        return formatResponse("admin", { token }, "Login success", "0000");
      } catch (error) {
        console.error(error);
        return formatResponse(
          "admin",
          null,
          "Login failed, please try again",
          "0004"
        );
      }
    }),

  // =================== Leaderboard ===================
  getLeaderboard: publicProcedure.query(async () => {
    try {
      const rows = await db.select().from(activities);

      const result = rows.map((row) => {
        const stationKeys: (keyof typeof row)[] = [
          "station1",
          "station2",
          "station3",
          "station4",
          "station5",
        ];
        const stationCount = stationKeys.filter(
          (key) => row[key] !== null
        ).length;

        // แปลง updatedAt จาก UTC → Bangkok local
        const updatedAtBangkok = row.updatedAt
          ? dayjs
              .utc(row.updatedAt)
              .tz("Asia/Bangkok")
              .format("YYYY-MM-DD HH:mm:ss")
          : null;

        return {
          userName: row.userName,
          stationCount,
          updatedAt: updatedAtBangkok,
        };
      });

      // sort: มาก → น้อย, ถ้าเท่ากัน updatedAt น้อยก่อน
      result.sort((a, b) => {
        if (b.stationCount !== a.stationCount)
          return b.stationCount - a.stationCount;
        if (!a.updatedAt) return 1;
        if (!b.updatedAt) return -1;

        const aTime = dayjs(a.updatedAt, "YYYY-MM-DD HH:mm:ss").valueOf();
        const bTime = dayjs(b.updatedAt, "YYYY-MM-DD HH:mm:ss").valueOf();
        return aTime - bTime;
      });

      return formatResponse("leaderboard", result, "Success", "0000");
    } catch (error) {
      console.error(error);
      return formatResponse(
        "leaderboard",
        null,
        "Cannot get leaderboard",
        "0004"
      );
    }
  }),
});
