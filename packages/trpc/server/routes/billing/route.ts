import { z } from "zod";

import { router, authenticatedProcedure } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { billingService } from "../../services";
import { getUsageSummary } from "@repo/services/billing/usage";
import {
  getUserSubscriptionOutputModel,
  startProSubscriptionOutputModel,
  cancelSubscriptionOutputModel,
  startSubscriptionInputModel,
} from "./model";

const TAGS = ["Billing"];
const getPath = generatePath("/billing");

export const billingRouter = router({
  getSubscription: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/getSubscription"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(z.undefined())
    .output(getUserSubscriptionOutputModel)
    .query(async ({ ctx }) => {
      const [subscription, usage] = await Promise.all([
        billingService.getUserSubscription(ctx.user.id),
        getUsageSummary(ctx.user.id),
      ]);

      return { ...subscription, usage };
    }),

  startSubscription: authenticatedProcedure
  .meta({
    openapi: {
      method: "POST",
      path: getPath("/startSubscription"),
      tags: TAGS,
      protect: true,
    },
  })
  .input(startSubscriptionInputModel)
  .output(startProSubscriptionOutputModel)
  .mutation(async ({input, ctx }) => {
    return billingService.createSubscription(
      ctx.user.id,
      input.plan
    );
  }),

  cancelSubscription: authenticatedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: getPath("/cancelSubscription"),
        tags: TAGS,
        protect: true,
      },
    })
    .input(z.undefined())
    .output(cancelSubscriptionOutputModel)
    .mutation(async ({ ctx }) => {
      return billingService.cancelProSubscription(ctx.user.id);
    }),
});