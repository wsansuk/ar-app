import { AdminProcedure } from "@/server/trpc/procedures/admin";
import { ActivitiesProcedure } from "./procedures/activities";
import { router } from "./trpc";

export const appRouter = router({
  activities: ActivitiesProcedure,
  admin: AdminProcedure,
});

export type AppRouter = typeof appRouter;
