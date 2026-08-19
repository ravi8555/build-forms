import {createUserWithEmailAndPasswordInputModel,createUserWithEmailAndPasswordOutputModel, signInUserWithEmailAndPasswordOutputModel, signInUserWithEmailAndPasswordInputModel,
getLoggedInUserInfoInputModel,
getLoggedInUserInfoOutputModel,verifyEmailOutputModel,resendVerificationEmailOutputModel, resendVerificationEmailInputModel, verifyEmailInputModel,logoutOutputModel,resetPasswordOutputModel,forgotPasswordOutputModel} from "./model";
import { userService } from "../../services";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../utils/path-generator";
import { getAuthenticationCookie, setAuthenticationCookie, clearAuthenticationCookie } from "../../utils/cookies";
import { authenticatedProcedure } from "../../trpc";
import {checkRateLimit} from "@repo/services/utils/check-rate-limit"
import {verifyTurnstileToken} from "@repo/services/utils/turnstile"
import {loginLimiter, registerLimiter, forgotPasswordLimiter, reportLimiter} from "@repo/services/utils/rate-limit"
import {
  forgotPasswordInput,
  resetPasswordInput,
} from "@repo/services/user/model"
const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");
import { TRPCError } from "@trpc/server";



export const authRouter = router({  

  createUserWithEmailAndPassword: publicProcedure.meta({openapi:{
    method:'POST',
    path: getPath('/createUserWithEmailAndPassword'),
    tags: TAGS}
  })
  .input(createUserWithEmailAndPasswordInputModel)
  .output(createUserWithEmailAndPasswordOutputModel)
  .mutation(async ({ input, ctx }) => {
  try {
    const { fullName, email, password } = input;
await checkRateLimit(
    registerLimiter,
    email
);

const captchaValid = await verifyTurnstileToken(input.turnstileToken);
if (!captchaValid) {
  throw new TRPCError({
    code: "BAD_REQUEST",
    message: "Captcha verification failed. Please try again.",
  });
}

    const { id }  =
      await userService.createUserWithEmailAndPassword({
        fullName,
        email,
        password,
      });

    return { id };

  } catch (error: any) {
    console.log("AUTH ERROR:", error.message);
    if (error.message === "USER_ALREADY_EXISTS") {
      throw new TRPCError({
        code: "CONFLICT",
        message: error.message,
      });
    }
    

    throw error;
  }
}),

  signInwithEmailAndPassword: publicProcedure.meta({openapi:{
    method:'POST',
    path: getPath('/signInUserWithEmailAndPassword'),
    tags: TAGS}
  })
  .input(signInUserWithEmailAndPasswordInputModel)
  .output(signInUserWithEmailAndPasswordOutputModel)
  .mutation(async ({ input, ctx }) => {
  try {
    const { email, password } = input;

    await checkRateLimit(loginLimiter, email);

    const { id, token } =
      await userService.signInUserWithEmailAndPassword({
        email,
        password,
      });

    setAuthenticationCookie(ctx, token);

    return { id };
  } catch (err:any) {
    console.error(err);
    if (err.message === "RATE_LIMIT_EXCEEDED.") {
      console.log(err.message)
      throw new TRPCError({
        code: "TOO_MANY_REQUESTS",
        message: "Too many requests. Please try again later.",
      });
  }
    
    throw err;
  }
}),

  getLoggedInUserInfo : authenticatedProcedure
  .meta({openapi:{
    method:'POST',
    path: getPath('/getLoggedInUserInfo'),
    tags: TAGS,
    protect:true
  }
  })
  .input(getLoggedInUserInfoInputModel)
  .output(getLoggedInUserInfoOutputModel)
  .query( async({ctx }    
  )=>{
    // const userToken = getAuthenticationCookie(ctx)
    // if(!userToken) throw new Error('User is not logged in')
    const {id, email, role, fullName, profileImageUrl} = await userService.getUserInfoById(ctx.user.id)

  return {
    id,
    fullName,
    email,
    role,
    profileImageUrl
  }  
  }),

  verifyEmail: publicProcedure
  .meta({
    openapi: {
      method: "POST",
      path: getPath("/verifyEmail"),
      tags: TAGS,
    },
  })
  .input(verifyEmailInputModel)
  .output(verifyEmailOutputModel)
  .mutation(async ({ input }) => {
    return userService.verifyEmail(input.token)
  }),

  resendVerificationEmail: publicProcedure
  .meta({
    openapi: {
      method: "POST",
      path: getPath("/resendVerificationEmail"),
      tags: TAGS,
    },
  })
  .input(resendVerificationEmailInputModel)
  .output(resendVerificationEmailOutputModel  )
  .mutation(async ({ input }) => {
    return userService.resendVerificationEmail(input.email)
  }),

  logout: authenticatedProcedure
  .meta({
    openapi: {
      method: "POST",
      path: getPath("/logout"),
      tags: TAGS,
      protect: true,
    },
  })
  .output(logoutOutputModel)
  .mutation(async ({ ctx }) => {
    clearAuthenticationCookie(ctx)
    return {
      success: true,
    }
  }),

  forgotPassword: publicProcedure
  .meta({
    openapi: {
      method: "POST",
      path: getPath("/forgotPassword"),
      tags: TAGS,
      protect: false,
    },
  })
  .input(forgotPasswordInput)
  .output(forgotPasswordOutputModel)
  .mutation(async ({ input }) => {
    await checkRateLimit(
    forgotPasswordLimiter,
    input.email
);

    const captchaValid = await verifyTurnstileToken(input.turnstileToken);
    if (!captchaValid) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Captcha verification failed. Please try again.",
      });
    }

    return userService.forgotPassword(input)
  }),

resetPassword: publicProcedure
  .meta({
    openapi: {
      method: "POST",
      path: getPath("/resetPassword"),
      tags: TAGS,
      protect: false,
    },
  })
  .input(resetPasswordInput)
  .output(resetPasswordOutputModel)
  .mutation(async ({ input }) => {
    return userService.resetPassword(input)
  }),

  



})
