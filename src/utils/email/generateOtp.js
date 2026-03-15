import crypto from "crypto";

export const generateOTP = (length =5)=>{
  let otp = "";
  for(let i = 0; i < length; i++){
    otp += crypto.randomInt(0, 10).toString();
  }
  return otp;
};