import type {CookieOptions, Response, Request} from 'express'
import { TRPCContext } from '../context';

const ONE_MINUTE = 60 * 1000; // milli
const ONE_HOUR   = 60 * ONE_MINUTE;
const ONE_DAY    = 24 * ONE_HOUR;
const ONE_MONTH  = 30 * ONE_DAY;
const ONE_YEAR   = 12 * ONE_MONTH;


const defaultCookieOption : CookieOptions = {
    path : '/',
    httpOnly : true,
    secure : false,
    sameSite : "strict",
    maxAge : ONE_YEAR
}



export function createCookieFactory(res:Response){
    return function     (
        name : string,
        value : string,
        opts:CookieOptions = defaultCookieOption
    ){
        res.cookie(name, value, opts)
    }
}

export function getCookiesFactory (req:Request){
    return function getCookie(name:string){
        return req.cookies?.[name]
    }
}

export function ClearCookiesFactory (res:Response){
    return function clearCookie(name:string){
        return res.clearCookie(name)
    }
}

const AUTEHNTICATION_COOKIE_NAME = 'authenticate-cookie'

// Authentication Cookies
// export function setAuthenticationCookie(ctx: TRPCContext, accessToken:string){
//     ctx.createCookie(AUTEHNTICATION_COOKIE_NAME,accessToken)
// }

// export function getAuthenticationCookie(ctx: TRPCContext){
//     return ctx.getCookie(AUTEHNTICATION_COOKIE_NAME)
// }

// export function clearAuthenticationCookie(ctx: TRPCContext){
//     ctx.clearCookie(AUTEHNTICATION_COOKIE_NAME)
// }

export function setAuthenticationCookie(
  ctx: { createCookie: TRPCContext["createCookie"] },
  accessToken: string
) {
  ctx.createCookie(AUTEHNTICATION_COOKIE_NAME, accessToken)
}

export function getAuthenticationCookie(
  ctx: { getCookie: TRPCContext["getCookie"] }
) {
  return ctx.getCookie(AUTEHNTICATION_COOKIE_NAME)
}

export function clearAuthenticationCookie(
  ctx: { clearCookie: TRPCContext["clearCookie"] }
) {
  ctx.clearCookie(AUTEHNTICATION_COOKIE_NAME)
}