import { initTRPC, TRPCError } from "@trpc/server";
import { OpenApiMeta } from "trpc-to-openapi";
import { getAuthenticationCookie } from "./utils/cookies";
import { userService } from "./services";

import { createContext } from "./context";


export const tRPCContext = initTRPC
  .meta<OpenApiMeta>()
  .context<typeof createContext>()
  .create({});

export const router = tRPCContext.router;

export const publicProcedure = tRPCContext.procedure;

export const authenticatedProcedure = tRPCContext.procedure.use(async options =>{
  
  const {ctx} = options
   const userToken = getAuthenticationCookie(ctx)
    // if(!userToken) throw new Error('User is not logged in')
    if(!userToken) throw new TRPCError({
  code: "UNAUTHORIZED",
  message: "User is not logged in",
});

      
    const {id} = await userService.verifyAndDecodedUserToken(userToken)
    
     
  return options.next({
    ctx :{
      ...ctx,
      user : {id}
    }
  })
})
