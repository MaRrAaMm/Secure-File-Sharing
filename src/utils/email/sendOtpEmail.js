import { sendEmail } from "./sendEmail.js";

export const sendOtpEmail = async({to, otp, type})=>{
  const subject =
    type === "confirmEmail"
      ? "Verify your email"
      : "Reset your password";

  const html = `
    <h3>Your OTP Code</h3>
    <p><strong>${otp}</strong></p>
    <p>This code is valid for 2 minutes.</p>
  `;

  await sendEmail({to, subject, html});
};
