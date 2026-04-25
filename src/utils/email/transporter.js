// import nodemailer from "nodemailer";

// export const transporter = nodemailer.createTransport({
//   host:"smtp.gmail.com",
//   port:587,
//   secure: false,
//   auth:{
//     user:process.env.EMAIL,
//     pass:process.env.PASS
//   },
// });

// export const transporter = nodemailer.createTransport({
//   host: "smtp-relay.brevo.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });

import nodemailer from "nodemailer";

export const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });
};