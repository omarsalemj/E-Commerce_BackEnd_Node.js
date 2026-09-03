import Joi from "joi";


export const createCategorySchema = Joi.object({
    name: Joi.string().min(2).max(30).required()
})

export const getCategorySchema = Joi.object({
    id: Joi.string().required().hex().length(24)
})

export const updateCategorySchema = Joi.object({
    id: Joi.string().required().hex().length(24),
    name: Joi.string().min(2).max(30).required()
})
