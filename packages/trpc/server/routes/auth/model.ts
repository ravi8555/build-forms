import {z} from 'zod'

export const createUserWithEmailAndPasswordInputModel =  z.object({
  fullName: z.string().describe('Full name of user'),
  email : z.email().describe('email address of user'),
  password : z.string().describe('Passwrod of the user')
})

export const createUserWithEmailAndPasswordOutputModel =  z.object({
  id: z.string().describe('id of user created')
})

export const signInUserWithEmailAndPasswordInputModel =  z.object({
  email : z.email().describe('email address of user'),
  password : z.string().describe('Passwrod of the user')
})

export const signInUserWithEmailAndPasswordOutputModel =  z.object({
  id: z.string().describe('id of user created')
})

export const getLoggedInUserInfoInputModel = z.undefined();
export const getLoggedInUserInfoOutputModel = z.object({
   id: z.string().describe('id of user created'),
   email : z.email().describe('email address of user'),
   fullName: z.string().describe('Full name of user'),
   profileImgUrl: z.string().describe('Profile image url of user').optional().nullable(),
});

export const verifyEmailInputModel = z.object({
  token: z.string().describe("verification token"),
})

export type VerifyEmailInputType =
  z.infer<typeof verifyEmailInputModel>


export const verifyEmailOutputModel =  z.object({
      id: z.string().uuid(),
      email: z.string(),
})
  

export const resendVerificationEmailInputModel = z.object({
  email: z.email().describe("email address"),
})

 export const resendVerificationEmailOutputModel =  z.object({
      success: z.boolean(),
    })

export const logoutOutputModel =  z.object({
      success: z.boolean(),
    }) 

export type ResendVerificationEmailInputType =
  z.infer<typeof resendVerificationEmailInputModel>

export const forgotPasswordOutputModel = z.object({
  success: z.boolean(),
})

export type ForgotPasswordOutputType =
  z.infer<typeof forgotPasswordOutputModel>

  export const resetPasswordOutputModel = z.object({
  success: z.boolean(),
})

export type ResetPasswordOutputType =
  z.infer<typeof resetPasswordOutputModel>