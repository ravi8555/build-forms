import nodemailer from "nodemailer"
import { env } from "../env"

export class EmailUtils {
  static transporter = nodemailer.createTransport({
    host: env.BREVO_SMTP_HOST,
    port: Number(env.BREVO_SMTP_PORT),
    secure: false,
    auth: {
      user: env.BREVO_SMTP_USER,
      pass: env.BREVO_SMTP_PASSWORD,
    },
  })

  static async sendVerificationEmail(
    email: string,
    name: string,
    token: string
  ) {
    const verificationUrl =      
    `${env.APP_URL}/verify-email?token=${token}`

    await this.transporter.sendMail({
      from: `"${env.BREVO_FROM_NAME}" <${env.BREVO_FROM_EMAIL}>`,
      to: email,
      subject: "Verify your email",

      // html: `
      //   <div style="font-family:sans-serif;padding:20px">
      //     <h2>Hello ${name}</h2>
      //     <p>Please verify your email address.</p>
      //     <a
      //       href="${verificationUrl}"
      //       style="
      //         background:#55C96B;
      //         color:white;
      //         padding:12px 20px;
      //         text-decoration:none;
      //         border-radius:8px;
      //         display:inline-block;
      //       "
      //     >
      //       Verify Email
      //     </a>

      //     <p>OR copy paste below url <br/> <br/>
      //     ${verificationUrl}
      //    </p
      //     <p>This link expires in 15 minutes.</p>
      //   </div>
      // `,
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0; padding:0; background:#f8fafc; font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc; padding:40px 0;">
    <tr>
      <td align="center">
        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          style="
            background:#ffffff;
            border-radius:16px;
            overflow:hidden;
            box-shadow:0 8px 30px rgba(0,0,0,0.08);
          "
        >
          
          <!-- Header -->
          <tr>
            <td
              align="center"
              style="
                background:#001438;
                padding:32px;
              "
            >
              <h1
                style="
                  margin:0;
                  color:#55C96B;
                  font-size:28px;
                  font-weight:700;
                "
              >
                BuildForms
              </h1>

              <p
                style="
                  margin:10px 0 0;
                  color:#d1d5db;
                  font-size:14px;
                "
              >
                Secure Form Platform
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h2
                style="
                  margin:0 0 16px;
                  font-size:24px;
                  color:#111827;
                "
              >
                Verify your email
              </h2>

              <p
                style="
                  margin:0 0 16px;
                  color:#4b5563;
                  font-size:16px;
                  line-height:1.6;
                "
              >
                Hi ${name},
              </p>

              <p
                style="
                  margin:0 0 24px;
                  color:#4b5563;
                  font-size:16px;
                  line-height:1.6;
                "
              >
                Thanks for signing up for <strong>BuildForms</strong>.
                Please verify your email address to activate your account.
              </p>

              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a
                      href="${verificationUrl}"
                      style="
                        background:#55C96B;
                        color:#ffffff;
                        text-decoration:none;
                        padding:14px 28px;
                        border-radius:10px;
                        font-size:16px;
                        font-weight:600;
                        display:inline-block;
                      "
                    >
                      Verify Email Address
                    </a>
                  </td>
                </tr>
              </table>

              <p
                style="
                  margin:28px 0 0;
                  color:#6b7280;
                  font-size:14px;
                  line-height:1.6;
                "
              >
                This verification link expires in <strong>15 minutes</strong>.
              </p>

              <p
                style="
                  margin:20px 0 0;
                  color:#6b7280;
                  font-size:14px;
                  line-height:1.6;
                "
              >
                If you did not create a BuildForms account, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td
              align="center"
              style="
                padding:24px;
                background:#f9fafb;
                border-top:1px solid #e5e7eb;
              "
            >
              <p
                style="
                  margin:0;
                  font-size:13px;
                  color:#9ca3af;
                "
              >
                © ${new Date().getFullYear()} BuildForms. All rights reserved.
              </p>

              <p
                style="
                  margin:8px 0 0;
                  font-size:12px;
                  color:#9ca3af;
                "
              >
                buildforms.in
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`,
    })
  }

  static async sendPasswordResetEmail(
  email: string,
  name: string,
  token: string
) {
  const resetUrl =
    `${env.APP_URL}/reset-password?token=${token}`

  await this.transporter.sendMail({
    from: `"${env.BREVO_FROM_NAME}" <${env.BREVO_FROM_EMAIL}>`,
    to: email,
    subject: "Reset your password",
    html: `
      <h2>Hello ${name}</h2>
      <p>Click below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link expires in 1 hour.</p>
    `,
  })
}
}
