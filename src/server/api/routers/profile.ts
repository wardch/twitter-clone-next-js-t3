import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { filterUsersForClient } from "../helpers/filterUserForClient";

export const profileRouter = createTRPCRouter({
    getUserByUserName: publicProcedure.input(z.object({username: z.string()}))
    .query(async ({ input }) => {
       const [user] = await clerkClient.users.getUserList({
            username: [input.username],
            limit: 1
        })

        if(!user) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'User not found'
            })
        }

        return filterUsersForClient(user)
    })})
