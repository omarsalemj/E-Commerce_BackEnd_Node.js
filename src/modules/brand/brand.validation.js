import Joi from "joi";


export const createBrandSchema = Joi.object({
    name: Joi.string().min(2).max(15).required()
})

export const getBrandSchema = Joi.object({
    id: Joi.string().required().hex().length(24)
})

export const updateBrandSchema = Joi.object({
    id: Joi.string().required().hex().length(24),
    name: Joi.string().min(2).max(15).required()
})
