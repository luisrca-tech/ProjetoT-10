import { z } from "zod";
import { prisma } from "~/lib/prisma";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  checkUser: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const dbUser = await prisma.user.findUnique({
        where: { id: input.userId },
      });

      return { exists: !!dbUser };
    }),

  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.user.create({
        data: {
          id: input.userId,
          email: input.email,
        },
      });
    }),
});
