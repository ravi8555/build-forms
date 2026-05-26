// import nodemailer from 'nodemailer'
// import 'dotenv/config'
// // Configure Brevo SMTP transport
// const createBrevoTransporter = () => {
//   return nodemailer.createTransport({
//     host: process.env.BREVO_SMTP_HOST,
//     port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
//     secure: false, // false for port 587
//     auth: {
//       user: process.env.BREVO_SMTP_USER,
//       pass: process.env.BREVO_SMTP_PASSWORD,
//     },
//     tls: {
//       ciphers: 'SSLv3',
//     },
//   })
// }

// // Send verification email using Brevo SMTP
// export class EmailUtils {
  
//   static async sendVerificationEmail(
//   email: string,
//   token: string,
//   name: string
// ) {
//   const verificationUrl =
//     `${process.env.APP_URL}/auth/verify-email?token=${token}`;

//   try {
//     const response = await fetch(
//   "https://api.brevo.com/v3/smtp/email",
//   {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       "api-key": process.env.EMAIL_API_KEY,
//     },
//     body: JSON.stringify({
//       sender: {
//         name: process.env.BREVO_FROM_NAME,
//         email: process.env.BREVO_FROM_EMAIL,
//       },
//       to: [{ email }],
//       subject: "Verify your email address",
//       templateId: 7,
//       params: {
//         NAME: name,
//         VERIFICATION_URL: verificationUrl,
//         TOKEN : token
//       }
//     })
//   }
// );

// const text = await response.text();

// // console.log("BREVO RESPONSE:", text);

// if (!response.ok) {
//   throw new Error("BREVO_EMAIL_FAILED");
// }
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }


//   static async sendVerificationSuccessEmail(email, name) {
//     const mailOptions = {
//       from: {
//         name: process.env.BREVO_FROM_NAME || 'Auth Portfoliohub',
//         address: process.env.BREVO_FROM_EMAIL || 'noreply@yourapp.com',
//       },
//       to: email,
//       subject: 'Email Verified Successfully',
//       html: `
//                 <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                     <h2 style="color: #4CAF50;">Email Verified! 🎉</h2>
//                     <p>Hello ${name},</p>
//                     <p>Your email has been successfully verified. You can now access all features of our platform.</p>
//                     <p>Thank you for joining us!</p>
//                     <br>
//                     <p>Best regards,<br>Auth Portfoliohub Team</p>
//                 </div>
//             `,
//     }
//     const transporter = createBrevoTransporter()
//     try {
//       await transporter.sendMail(mailOptions)
//       console.log(`✅ Verification success email sent to: ${email}`)
//     } catch (error) {
//       console.error('Failed to send success email:', error)
//     }
//   }

//     static async sendPasswordResetEmail(email, resetUrl, name) {
//       console.log(`📧 Sending password reset email to ${email}...`)

//       const mailOptions = {
//         from: {
//           name: process.env.BREVO_FROM_NAME || 'Your App',
//           address: process.env.BREVO_FROM_EMAIL || 'noreply@yourapp.com',
//         },
//         to: email,
//         subject: 'Password Reset Request',
//         html: `
//               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                   <h2 style="color: #4CAF50;">Reset Your Password</h2>
//                   <p>Hello ${name},</p>
//                   <p>You requested to reset your password. Click the button below to reset it:</p>
//                   <div style="text-align: center; margin: 30px 0;">
//                       <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Reset Password</a>
//                   </div>
//                   <p>Or copy this link: <a href="${resetUrl}">${resetUrl}</a></p>
//                   <p>This link will expire in 1 hour.</p>
//                   <p>If you didn't request this, please ignore this email.</p>
//                   <br>
//                   <p>Best regards,<br>Auth Portfoliohub</p>
//               </div>
//           `,
//       }

      

//       const transporter = createBrevoTransporter()
//       try {
//         await transporter.sendMail(mailOptions)
//         console.log(`✅ Password reset email sent to: ${email}`)
//       } catch (error) {
//         console.error('Failed to send reset email:', error)
//         throw new Error('Failed to send reset email')
//       }
//     }

//     static async sendPasswordChangeConfirmationEmail(email, name) {
//       const mailOptions = {
//         from: {
//           name: process.env.BREVO_FROM_NAME || 'Auth Portfoliohub',
//           address: process.env.BREVO_FROM_EMAIL || 'noreply@yourapp.com',
//         },
//         to: email,
//         subject: 'Password Changed Successfully',
//         html: `
//               <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//                   <h2 style="color: #4CAF50;">Password Changed</h2>
//                   <p>Hello ${name},</p>
//                   <p>Your password has been successfully changed.</p>
//                   <p>If you didn't make this change, please contact support immediately.</p>
//                   <br>
//                   <p>Best regards,<br>Auth Portfoliohub</p>
//               </div>
//           `,
//       }

//       const transporter = createBrevoTransporter()

//       try {
//         await transporter.sendMail(mailOptions)
//         console.log(`✅ Password change confirmation sent to: ${email}`)
//       } catch (error) {
//         console.error('Failed to send confirmation email:', error)
//       }
//     }

//     static async sendForgotPasswordEmail(
//     email: string,
//     token: string,
//     firstName: string
//   ) {
//     const transporter = createBrevoTransporter()
//     const resetUrl =
//       `${process.env.APP_URL}/auth/reset-password?token=${token}`;

//     await transporter.sendMail({
//       from: process.env.BREVO_FROM_EMAIL,
//       to: email,
//       subject: "Reset Your Password",
//       html: `
//         <h2>Hello ${firstName}</h2>

//         <p>Click below to reset your password:</p>

//         <a href="${resetUrl}">
//           Reset Password
//         </a>

//         <p>This link expires in 15 minutes.</p>
//       `
//     });

//     }
// }
