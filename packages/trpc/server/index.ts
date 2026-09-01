import { router } from "./trpc";
import { authRouter } from "./routes/auth/route";
import { formRouter } from "./routes/form/route";
import { billingRouter } from "./routes/billing/route";


export const serverRouter = router({
  auth : authRouter,
  billing: billingRouter,
  form: formRouter,

  
  
});





export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
