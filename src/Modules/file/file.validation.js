import joi from "joi";

const objectId = joi.string().hex().length(24);
export const downloadFile =joi
  .object({
    fileId:objectId.required(),
  })
  .required();

export const shareFile = joi
  .object({
    fileId: objectId.required(),
    targetUserId: objectId.required(),
    permission:joi.string().valid("read", "download").required(),
  })
  .required();
