// packages/trpc/server/services/index.ts

import UserService from "@repo/services/user";
import BillingService from "@repo/services/billing";

export const userService = new UserService();
export const billingService = new BillingService();


// import FormReportService from "@repo/services/form-reports";
// export const reportService = new FormReportService();
