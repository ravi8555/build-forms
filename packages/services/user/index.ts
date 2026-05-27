// import { db } from "@repo/database";
// import { usersTable } from "@repo/database/schema";
// import { env } from "../env";
// import { googleOAuth2Client } from "../clients/google-oauth";
// import { GetAuthenticationMethodOutputSchema } from "./model";

// class UserService {
//   public async getAuthenticationMethods(): Promise<
//     ReadonlyArray<GetAuthenticationMethodOutputSchema>
//   > {
//     const supportedAuthenticationProviders: GetAuthenticationMethodOutputSchema[] = [];

//     const isGoogleConfigured = !!(env.GOOGLE_OAUTH_CLIENT_ID && env.GOOGLE_OAUTH_CLIENT_SECRET);

//     if (isGoogleConfigured) {
//       const url = googleOAuth2Client.generateAuthUrl();
//       supportedAuthenticationProviders.push({
//         provider: "GOOGLE_OAUTH",
//         displayName: "Google",
//         displayText: "Signin with Google",
//         authUrl: url,
//       });
//     }

//     return supportedAuthenticationProviders;
//   }
// }

// export default UserService;

import {randomBytes, createHmac} from 'node:crypto'
// import  {TRPCError}  from "@trpc/server";
import JWT  from 'jsonwebtoken'
import {db, eq} from '@repo/database'
import {usersTable} from '@repo/database/models/user'
import {env} from '../env'
import {EmailUtils} from '../utils/email'

import {CreateUserWithEmailAndPasswordType, createUserWithEmailAndPasswordInput, GenerateUserTokenPayloadType, generateUserTokenPayload, SignInUserWithEmailAndPasswordInputType, signInUserWithEmailAndPasswordInput, ForgotPasswordInputType,ResetPasswordInputType,forgotPasswordInput,resetPasswordInput} from './model'
import { email } from 'zod'
import { error } from 'node:console'
import { th } from 'zod/v4/locales'


class UserService{

  private async getuserByEmail(email:string){
      const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
      if(!result || result.length === 0) return null
      return result[0]
  }

  private async generateUserToken(payload:GenerateUserTokenPayloadType){
   const {id} = await generateUserTokenPayload.parseAsync(payload)
   const token = JWT.sign({id}, env.JWT_SECRET);
   return { token }

  }

  private async verifyUserToken(token:string):Promise<GenerateUserTokenPayloadType>{
    try {
      const verifiationResult =JWT.verify(token, env.JWT_SECRET) as GenerateUserTokenPayloadType;

      return verifiationResult
      
    } catch (error) {
      throw new Error('Invalid Toekn')
    }
  }

  private async generateUserHash(salt:string, password:string){
    return createHmac('sha256', salt).update(password).digest('hex')
  }

  public async getUserInfoById(id:string){

    const user = await db.select({
      id: usersTable.id,
      email : usersTable.email,
      fullName: usersTable.fullName,
      profileImageUrl: usersTable.profileImageUrl
    }).from(usersTable).where(eq(usersTable.id, id))

    if(!user || user.length === 0) throw new Error('User does not exist');
    return user[0]!

  }
  private async getUserByVerificationToken(token: string) {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.verificationToken, token))

  if (!result.length) return null

  return result[0]
}

  public async createUserWithEmailAndPassword(payload:CreateUserWithEmailAndPasswordType){ 
    const {fullName, email, password} = await createUserWithEmailAndPasswordInput.parseAsync(payload)
    const exstingUserWithEmail = await this.getuserByEmail(email);

    console.log("exstingUserWithEmail===>", exstingUserWithEmail);
    
    if(exstingUserWithEmail) 
// throw new TRPCError({
//   code: "CONFLICT",
//   message: "User already exists",
// });
      throw new Error(`User with ${email} ID aleary exist`);

    const salt = randomBytes(16).toString('hex');
    const hash = await this.generateUserHash(salt, password) 

    const verificationToken = this.generateVerificationToken()
    const expiry = new Date(Date.now() + 15 * 60 * 1000)

    const userInsertResult = await db.insert(usersTable).values({
      email,
      fullName, 
      password:hash, 
      salt,
      emailVerified: false,
      verificationToken,
      verificationTokenExpiry: expiry,
    }).returning({
      id: usersTable.id
    })

    if(!userInsertResult || userInsertResult.length === 0 || !userInsertResult[0]?.id) throw new Error('Something went wrong while creating new user')
    
   const userId = userInsertResult[0]?.id

    // const {token} =  await this.generateUserToken({id: userId}) 
await EmailUtils.sendVerificationEmail(
  email,
  fullName,
  verificationToken
)

    return {
      id: userId,
      // token
    }

  }

  public async verifyEmail(token:string){
    const user = await this.getUserByVerificationToken(token)

    if (!user) {
    throw new Error("INVALID_VERIFICATION_TOKEN")
  }
  if (!user.verificationTokenExpiry) {
    throw new Error("INVALID_VERIFICATION_TOKEN")
  }
  const isExpired =
    new Date(user.verificationTokenExpiry).getTime() < Date.now()

  if (isExpired) {
    throw new Error("VERIFICATION_TOKEN_EXPIRED")
  }

  await db
    .update(usersTable)
    .set({
      emailVerified: true,
      verificationToken: null,
      verificationTokenExpiry: null,
    })
    .where(eq(usersTable.id, user.id))

  return {
    id: user.id,
    email: user.email,
  }
  }

  public async resendVerificationEmail(email: string) {
    
  const user = await this.getuserByEmail(email)

  if (!user) {
    throw new Error("USER_NOT_FOUND")
  }

  if (user.emailVerified) {
    throw new Error("EMAIL_ALREADY_VERIFIED")
  }

  const verificationToken = this.generateVerificationToken()

  const expiry = new Date(Date.now() + 15 * 60 * 1000)

  await db
    .update(usersTable)
    .set({
      verificationToken,
      verificationTokenExpiry: expiry,
    })
    .where(eq(usersTable.id, user.id))

  await EmailUtils.sendVerificationEmail(
    user.email,
    user.fullName,
    verificationToken
  )

  return {
    success: true,
  }
}

  public async signInUserWithEmailAndPassword(payload:SignInUserWithEmailAndPasswordInputType){
    const {email, password} = await signInUserWithEmailAndPasswordInput.parseAsync(payload)
    
    const exsitingUser = await this.getuserByEmail(email)
    if(!exsitingUser) throw new Error(`User with emain ID ${email} does not exists`)

      if(!exsitingUser.password || !exsitingUser.salt) throw new Error('Invalid authentication method');

      if(!exsitingUser.emailVerified) { throw new Error("EMAIL_NOT_VERIFIED")}

      const hash = await this.generateUserHash(exsitingUser.salt, password) 

    if (hash !== exsitingUser.password) {
      throw new Error("Invalid user email or password")
    }

      if (!exsitingUser.emailVerified) {
  throw new Error("EMAIL_NOT_VERIFIED")
}

      const  {token} = await this.generateUserToken({id: exsitingUser.id})   

      return{
        id: exsitingUser.id,
        token
      }
  }

  public async verifyAndDecodedUserToken(token:string){
    const {id} = await this.verifyUserToken(token)
    // const userInfo = await this.getUserInfoById(id)
    return {
      id
    }
  }

private generateVerificationToken() {
  return randomBytes(32).toString("hex")
}

public async forgotPassword(
  payload: ForgotPasswordInputType
) {
  const { email } =
    await forgotPasswordInput.parseAsync(payload)

  const user = await this.getuserByEmail(email)

  if (!user) {
    return {
      success: true,
    }
  }

  const token = randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

  await db
    .update(usersTable)
    .set({
      passwordResetToken: token,
      passwordResetExpiresAt: expiresAt,
    })
    .where(eq(usersTable.id, user.id))

  await EmailUtils.sendPasswordResetEmail(
    user.email,
    user.fullName,
    token
  )

  return {
    success: true,
  }
}


public async resetPassword(
  payload: ResetPasswordInputType
) {
  const { token, password } =
    await resetPasswordInput.parseAsync(payload)

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.passwordResetToken, token))

  if (!users.length) {
    throw new Error("Invalid reset token")
  }

  const user = users[0]!

  if (
    !user.passwordResetExpiresAt ||
    user.passwordResetExpiresAt < new Date()
  ) {
    throw new Error("Reset link expired")
  }

  const salt = randomBytes(16).toString("hex")
  const hash = await this.generateUserHash(
    salt,
    password
  )

  await db
    .update(usersTable)
    .set({
      password: hash,
      salt,
      passwordResetToken: null,
      passwordResetExpiresAt: null,
    })
    .where(eq(usersTable.id, user.id))

  return {
    success: true,
  }
}


  
}

export default UserService;
