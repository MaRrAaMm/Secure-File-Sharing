import multer from "multer";

export const fileValidation ={
  files:[
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
};

export const uploadFile =(allowedTypes)=>{
  const storage = multer.memoryStorage();
  const fileFilter = (req, file, cb)=>{
    if (!allowedTypes.includes(file.mimetype)){
      return cb(new Error("Invalid file type"), false);
    }
    cb(null, true);
  };
  return multer({
    storage,
    fileFilter,
    limits:{
      fileSize:5 * 1024 * 1024,//5mb
    },
  });
};
