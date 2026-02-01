import * as crypto from "crypto";

export const encryptFile =(buffer)=>{
  const iv = crypto.randomBytes(16);
  const key = Buffer.from(process.env.CRYPTO_KEY);
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    key,
    iv
  );
  const encrypted = Buffer.concat([
    cipher.update(buffer),
    cipher.final(),
  ]);

  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted,
  };
};
