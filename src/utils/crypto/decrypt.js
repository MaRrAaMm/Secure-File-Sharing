import * as crypto from "crypto";

export const decryptFile = (encryptedBuffer, iv) =>{
  const key = Buffer.from(process.env.CRYPTO_KEY);
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    key,
    Buffer.from(iv,"hex")
  );

  return Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final(),
  ]);
};
