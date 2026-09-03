import Joi from "joi";


export const createProductSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(5).max(500).required(),
    category: Joi.string().required().hex().length(24),
    brand: Joi.string().required().hex().length(24),
    imgCover: Joi.string(),
    images: Joi.array().items(Joi.string()).min(1).max(8),
    quantity: Joi.number().min(0).default(1),
    sold: Joi.number().min(0).default(0),
    subCategory: Joi.string().required().hex().length(24),
    ratingAvg: Joi.number().min(0).max(5).default(0),
    ratingCount: Joi.number().min(0).default(0)
})

export const getProductSchema = Joi.object({
    id: Joi.string().required().hex().length(24)
})

export const updateProductSchema = Joi.object({
    id: Joi.string().required().hex().length(24),
    title: Joi.string().min(2).max(100).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(5).max(500).required(),
    category: Joi.string().required().hex().length(24),
    brand: Joi.string().required().hex().length(24),
    imgCover: Joi.string().required(),
    images: Joi.array().items(Joi.string()).min(1).max(8).required(),
    quantity: Joi.number().min(0).default(1),
    sold: Joi.number().min(0).default(0),
    subCategory: Joi.string().required().hex().length(24),
    ratingAvg: Joi.number().min(0).max(5).default(0),
    ratingCount: Joi.number().min(0).default(0)
})
