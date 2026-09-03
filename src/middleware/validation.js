export const validation = (schema)=>{
    return(req, res, next)=>{
        let inputs = {...req.body, ...req.query, ...req.params}
        let {error} = schema.validate(inputs, { abortEarly: false })
        if(!error) return next()
        let errors = error.details.map(detail => detail.message)
        res.json({errors})
    }
}