import Joi from "joi";


export const createSubcategorySchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    category: Joi.string().required().hex().length(24)
})

export const getSubcategorySchema = Joi.object({
    id: Joi.string().required().hex().length(24)
})

export const updateSubcategorySchema = Joi.object({
    id: Joi.string().required().hex().length(24),
    name: Joi.string().min(2).max(100).required(),
    category: Joi.string().required().hex().length(24)
})
