import Joi from "joi";

export const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required().messages({
    "string.min": "First name must be at least 2 characters long",
    "string.max": "First name must not exceed 30 characters",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().min(2).max(30).required().messages({
    "string.min": "Last name must be at least 2 characters long",
    "string.max": "Last name must not exceed 30 characters",
    "any.required": "Last name is required",
  }),
  age: Joi.number().integer().min(18).max(100).required().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.min": "Age must be at least 18",
    "number.max": "Age must not exceed 100",
    "any.required": "Age is required",
  }),
  gender: Joi.string().required().messages({
    "any.required": "Gender is required",
  }),
  skills: Joi.string().required().messages({
    "any.required": "Skills required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
});

export const profileUpdateSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).optional().messages({
    "string.min": "First name must be at least 2 characters long",
    "string.max": "First name must not exceed 30 characters",
  }),
  lastName: Joi.string().min(2).max(30).optional().messages({
    "string.min": "Last name must be at least 2 characters long",
    "string.max": "Last name must not exceed 30 characters",
  }),
  age: Joi.number().integer().min(18).max(100).optional().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.min": "Age must be at least 18",
    "number.max": "Age must not exceed 100",
  }),
  skills: Joi.string().optional(),
  gender: Joi.string().optional()
});
