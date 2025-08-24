import { NextResponse } from "next/server";
import { DateTime } from "luxon";
import { eq, sql } from "drizzle-orm";
import db from "@/db";
import { activities } from "@/db/schema";

type RequestBody = {
  username: string;
  station: string;
};

const validStations = [
  "station1",
  "station2",
  "station3",
  "station4",
  "station5",
];

export async function POST(request: Request) {
  try {
    const data: RequestBody = await request.json();
    const { username, station } = data;

    if (!username || !station) {
      return NextResponse.json(
        {
          error:
            "Invalid input: userName, station, and timestamp fields are required",
        },
        { status: 400 }
      );
    }

    if (!validStations.includes(station)) {
      return NextResponse.json(
        { error: "Invalid station name" },
        { status: 400 }
      );
    }

    const updatedAt = DateTime.now()
      .setZone("Asia/Bangkok")
      .toFormat("yyyy-MM-dd HH:mm:ss");

    console.log({ updatedAt });

    const result = await db
      .update(activities)
      .set({
        [station]: updatedAt,
        updatedAt: sql`${updatedAt}`,
      })
      .where(eq(activities.userName, username))
      .execute();

    const updateResult = Array.isArray(result) ? result[0] : result;

    if (updateResult.affectedRows === 0) {
      return NextResponse.json(
        { error: "Username not found" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Updated successfully!", receivedData: data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
