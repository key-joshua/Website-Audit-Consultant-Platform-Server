import Joi from 'joi';

const urlSchema = Joi.object({
  url: Joi.string().uri({ scheme: ['http', 'https'] }).required().messages({
      'any.required': 'url is required',
      'string.empty': 'url cannot be an empty field',
      'string.base': 'url should be a type of string',
      'string.pattern.base': 'url format is invalid',
      'string.uri': 'url must be a valid http or https URL. e.g., http://blissagency.com or https://blissagency.com',
      'string.uriCustomScheme': 'url must start with http or https. e.g., http://blissagency.com or https://blissagency.com',
    }),
});

const uuidSchema = Joi.object({
  id: Joi.string().guid({ version: ['uuidv4'] }).required().messages({
      'any.required': 'id is required',
      'string.empty': 'id cannot be an empty field',
      'string.base': 'id should be a type of string',
      'string.guid': 'id must be a valid UUID v4',
    }),
});

const domainSchema = Joi.object({
  domain: Joi.string().lowercase().trim().pattern( /^(?!:\/\/)([a-z0-9-]+\.)+[a-z]{2,}$/i ).required().messages({
      'any.required': 'domain is required',
      'string.empty': 'domain cannot be an empty field',
      'string.base': 'domain should be a type of string',
      'string.pattern.base':
        'domain must be a valid domain (e.g. blissagency.com or openai.com)',
    }),
});

export {
  urlSchema,
  uuidSchema,
  domainSchema
};
