import Joi from "joi";

const createRecipeSchema = Joi.object({
  title: Joi.string().required().max(255).messages({
    "required.any": "Title is required",
  }),

  description: Joi.string().required().messages({
    "required.any": "Description is required",
  }),

  ingredients: Joi.string().required().messages({
    "required.any": "Ingredients are required",
  }),

  instructions: Joi.string().required().messages({
    "required.any": "Instructions are required",
  }),
  
});

const updateRecipeSchema = Joi.object({
  title: Joi.string().required().max(255).messages({
    "required.any": "Title is required",
  }),

  description: Joi.string().required().messages({
    "required.any": "Description is required",
  }),

  ingredients: Joi.string().required().messages({
    "required.any": "Ingredients are required",
  }),

  instructions: Joi.string().required().messages({
    "required.any": "Instructions are required",
  }),
});

export { createRecipeSchema, updateRecipeSchema };
