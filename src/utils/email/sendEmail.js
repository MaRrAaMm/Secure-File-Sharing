import { transporter } from "./transporter.js";

export const sendEmail = async ({to, subject, html}) =>{
  const info = await transporter.sendMail({
    from: `"Secure Files" <${process.env.EMAIL}>`,
    to,
    subject,
    html,
  });

  if(info.rejected.length){
    throw new Error("Email rejected");
  }
  return true;
};
