import type {CreateExpressContextOptions} from '@trpc/server/adapters/express'
import {ClearCookiesFactory, createCookieFactory, getCookiesFactory} from './utils/cookies'

export interface TRPCCtxUser{
    user :string
}

export interface TRPCContext{
    createCookie : ReturnType<typeof createCookieFactory>;
    getCookie : ReturnType<typeof getCookiesFactory>
    clearCookie : ReturnType<typeof ClearCookiesFactory>

    user? :TRPCCtxUser

}

export async function createContext({
    req, res
}:CreateExpressContextOptions):Promise<TRPCContext> {
    const ctx : TRPCContext ={
        createCookie: createCookieFactory(res),
        getCookie:getCookiesFactory(req),
        clearCookie : ClearCookiesFactory(res),
        user : undefined
    }

    return ctx

}
export type Context = Awaited<ReturnType<typeof createContext>>;
