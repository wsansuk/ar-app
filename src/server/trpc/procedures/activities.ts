import db from "@/db";
import { activities } from "@/db/schema";
import { formatResponse } from "@/server/utils/response";
import { eq, sql } from "drizzle-orm";
import { DateTime } from "luxon";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const validStations = [
  "station1",
  "station2",
  "station3",
  "station4",
  "station5",
] as const;

export const ActivitiesProcedure = router({
  registerUser: publicProcedure
    .input(
      z.object({
        userName: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const userName = input.userName.trim();

      if (!userName) {
        return formatResponse("user", null, "Username cannot be empty", "0001");
      }

      try {
        const existingUser = await db
          .select()
          .from(activities)
          .where(eq(activities.userName, userName));

        if (existingUser.length > 0) {
          return formatResponse(
            "user",
            existingUser,
            "Username already exists",
            "0004"
          );
        }

        const now = DateTime.now()
          .setZone("Asia/Bangkok")
          .toFormat("yyyy-MM-dd HH:mm:ss");

        await db.insert(activities).values({
          userName,
          createdAt: sql`${now}`,
          updatedAt: sql`${now}`,
        });

        return formatResponse("user", null, "Success", "0000");
      } catch (error) {
        return formatResponse(
          "user",
          null,
          "Create user failed, please try again",
          "0004"
        );
      }
    }),

  updateActivity: publicProcedure
    .input(
      z.object({
        userName: z.string(),
        station: z.string(),
        timestamp: z.string().transform((val) => new Date(val)),
      })
    )
    .mutation(async ({ input }) => {
      const userName = input.userName.trim();
      const { station, timestamp } = input;

      if (!userName || !station || !timestamp) {
        return formatResponse(
          "activity",
          null,
          "Invalid input: userName, station, and timestamp fields are required",
          "0001"
        );
      }

      if (!validStations.includes(station as (typeof validStations)[number])) {
        return formatResponse("activity", null, "Invalid station name", "0001");
      }

      try {
        const updatedAt = DateTime.now()
          .setZone("Asia/Bangkok")
          .toFormat("yyyy-MM-dd HH:mm:ss");

        const result = await db
          .update(activities)
          .set({
            [station]: timestamp,
            updatedAt: sql`${updatedAt}`,
          })
          .where(eq(activities.userName, userName))
          .execute();

        const updateResult = Array.isArray(result) ? result[0] : result;

        if (updateResult.affectedRows === 0) {
          return formatResponse("activity", null, "Username not found", "0002");
        }

        return formatResponse("activity", null, "Success", "0000");
      } catch (error) {
        return formatResponse(
          "activity",
          null,
          "Update failed, please try again",
          "0004"
        );
      }
    }),

  leaderBoard: publicProcedure.query(async () => {
    try {
      const rows = await db.select().from(activities);

      const stationKeys = [
        "station1",
        "station2",
        "station3",
        "station4",
        "station5",
      ] as const;

      const result = rows.map((row) => {
        const stationCount = stationKeys.filter(
          (key) => row[key] !== null
        ).length;

        const xp = stationCount * 100;

        const timeDiffMs =
          row.updatedAt && row.createdAt
            ? new Date(row.updatedAt).getTime() -
              new Date(row.createdAt).getTime()
            : 0;

        // Convert to minutes
        const timeDiffMins = Math.floor(timeDiffMs / (1000 * 60));

        return {
          userName: row.userName,
          xp,
          stationCount,
          timeDiffMins,
        };
      });

      result.sort((a, b) => {
        if (b.stationCount !== a.stationCount) {
          return b.stationCount - a.stationCount;
        }
        return a.timeDiffMins - b.timeDiffMins;
      });

      return formatResponse("score", result, "Success", "0000");
    } catch (error) {
      return formatResponse(
        "score",
        null,
        "Cannot get leader board, please try again",
        "0004"
      );
    }
  }),
});
