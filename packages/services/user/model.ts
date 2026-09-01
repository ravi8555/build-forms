// import { z } from "zod";

import { z} from 'zod'

export const createUserWithEmailAndPasswordInput = z.object({
  fullName: z.string().describe('Full name of user'),
  // role:z.string().describe('role of user'),
  email : z.email().describe('email address of user'),
  password : z.string().describe('Passwrod of the user')
})


export type CreateUserWithEmailAndPasswordType = z.infer<typeof createUserWithEmailAndPasswordInput>
export const userRoleModel = z.enum([
  "USER",
  "SUPER_ADMIN",
]);

export type UserRoleType =  z.infer<typeof userRoleModel>;
export const generateUserTokenPayload = z.object({
  id: z.string().describe('uuid of user'),
  role:userRoleModel
  // role:z.string().describe('role of user'),
}) 

export type GenerateUserTokenPayloadType = z.infer<typeof generateUserTokenPayload>

export const signInUserWithEmailAndPasswordInput = z.object({
  email : z.email().describe('email of the user'),
  password : z.string().describe('Passwrod of the user')
})

export type SignInUserWithEmailAndPasswordInputType = z.infer<typeof signInUserWithEmailAndPasswordInput>


export const forgotPasswordInput = z.object({
  email: z.email(),
  turnstileToken: z.string().optional().describe("Cloudflare Turnstile token"),
})

export type ForgotPasswordInputType =  z.infer<typeof forgotPasswordInput>

export const resetPasswordInput = z.object({
  token: z.string(),
  password: z.string().min(8),
})
export type ResetPasswordInputType =
  z.infer<typeof resetPasswordInput>

export const getAuthenticationMethodOutputSchema = z.object({
  provider: z.enum(["GOOGLE_OAUTH"]),
  displayName: z.string().optional(),
  displayText: z.string().optional(),
  authUrl: z.string(),
});
export type GetAuthenticationMethodOutputSchema = z.infer<
  typeof getAuthenticationMethodOutputSchema
>;


export const googleOauthInput = z.object({
  email: z.string(),
  fullName:z.string(),
  googleId: z.string(),
  profileImage: z.string().optional(),
})

export type GoogleOauthInputType =
  z.infer<typeof googleOauthInput>

