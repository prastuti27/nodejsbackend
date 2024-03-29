import Joi from "joi";

const createUserSchema = Joi.object({
  firstname: Joi.string().required().max(255).messages({
    "required.any": "Firstname is required",
  }),
  lastname: Joi.string().required().max(255).messages({
    "required.any": "Lastname is required",
  }),

  email: Joi.string().email().required().max(255).messages({
    "required.any": "Fullname is required",
  }),

  password: Joi.string().required().max(255).messages({
    "required.any": "Fullname is required",
  }),
});

export { createUserSchema };
