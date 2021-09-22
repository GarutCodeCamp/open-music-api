const Joi = require('joi');

const OpenMusicSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required(),
    performer: Joi.string().required(),
    genre: Joi.string(),
    duration: Joi.number()
})

module.exports = { OpenMusicSchema }