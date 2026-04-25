// import { transporter } from "./transporter.js";
// import { Resend } from "resend";
// export const sendEmail = async ({to, subject, html}) =>{
//   const info = await transporter.sendMail({
//     from: `"Healthy App" <${process.env.EMAIL}>`,
//     to,
//     subject,
//     html,
//   });

//   if(info.rejected.length){
//     throw new Error("Email rejected");
//   }
//   return true;
// };
import dotenv from "dotenv";
dotenv.config();

// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);
// export const sendEmail = async ({to, subject, html}) =>{
//   try {
//     console.log("Sending email to:", to);
//     const data = await resend.emails.send({
//       from: "onboarding@resend.dev", 
//       to,                            
//       subject,
//       html,
//     });
//     console.log("Email sent:", data?.id);
//     return true;
//   } catch (err) {
//     console.log(" Email Error FULL:", err);
//     return false;
//   }
// };

import { createTransporter } from "./transporter.js";

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html,
  });
};