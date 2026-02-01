import { Types } from "mongoose";
import Joi from "joi";

export const isValid = (schema) =>{
  return (req, res, next) =>{
    if (!schema || typeof schema.validate !== "function"){
      const error= new Error("Invalid validation schema");
      error.statusCode = 500;
      return next(error);
    }
    let data ={ ...req.body, ...req.query, ...req.params};
    const result = schema.validate(data,{abortEarly: false});
    if (result.error){
      const messages= result.error.details.map((obj)=> obj.message);
      const error = new Error(messages.join(", "));
      error.statusCode = 400;
      return next(error);
    }
    next();
  };
};

export const isValidId =(value, helpers) =>{
  if (!Types.ObjectId.isValid(value)){
    return helpers.message("Invalid ID format");
  }
  return value;
};
