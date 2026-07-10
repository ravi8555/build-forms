export async function checkRateLimit(
  limiter: any,
  identifier: string
) {
  const { success } = await limiter.limit(identifier);

  if (!success) {
    throw new Error("RATE_LIMIT_EXCEEDED");
  }
}

// import { TRPCError } from "../../trpc/server/trpc";
// // import { TRPCError } from "../../trpc";
// // // import { TRPCError } from "@trpc/server";

// export async function checkRateLimit(
//   limiter: any,
//   identifier: string
// ) {
//   const { success } = await limiter.limit(identifier);

//   if (!success) {
//     throw new TRPCError({
//       code: "TOO_MANY_REQUESTS",
//       message: "Too many requests. Please try again after 1 minute.",
//     });
//   }
// }