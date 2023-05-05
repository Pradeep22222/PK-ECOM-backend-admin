import Joi from "joi";
import {
  ADDRESS,
  DATE,
  EMAIL,
  FNAME,
  LNAME,
  PASSWORD,
  PHONE,
  SHORTSTR,
  STATUS,
} from "./constant.js";

const validator = (schema, req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    error.status = 200;
    return next(error);
  }
  next();
};
export const newAdminUserValidation = (req, res, next) => {
  // define rules
  const schema = Joi.object({
    firstName: FNAME.required(),
    lastName: LNAME.required(),
    email: EMAIL.required(),
    phone: PHONE,
    dob: DATE,
    address: ADDRESS,
    password: PASSWORD.required(),
  });
  // give data to the rules
  validator(schema, req, res, next);
};

export const emailVerificationValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL.required(),
    emailValidationCode: SHORTSTR.required(),
  });
  validator(schema, req, res, next);
};

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: EMAIL.required(),
    password: PASSWORD.required(),
  });
  validator(schema, req, res, next);
};
export const newCategoryValidation = (req, res, next) => {
  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  const schema = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null),
  });
  validator(schema, req, res, next);
};

export const updateCategoryValidation = (req, res, next) => {
  req.body.parentId = req.body.parentId ? req.body.parentId : null;
  const schema = Joi.object({
    status: STATUS,
    name: SHORTSTR.required(),
    parentId: SHORTSTR.allow(null),
    _id: SHORTSTR.required(),
  });
  validator(schema, req, res, next);
};
