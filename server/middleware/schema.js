import Joi from '@hapi/joi';

export const requestBodySchema = Joi.object({
  rule: Joi.object()
    .keys({
      field: Joi.string().required().messages({
        'string.base': `field should be a string`,
        'any.required': `field is required.`,
      }),
      condition: Joi.string()
        .valid('eq', 'neq', 'gte', 'gt', 'contains')
        .required()
        .messages({
          'string.base': `condition should be a string`,
          'any.required': `condition is required.`,
        }),
      condition_value: Joi.any().required().messages({
        'any.required': `condition_value is required`,
      }),
    })
    .required()
    .messages({
      'string.base': `rule should be an object`,
      'any.required': `rule is required.`,
    }),
  data: Joi.alternatives().try(
    Joi.string().required(),
    Joi.array().required(),
    Joi.object().required()
    // .when('rule')
  ),
});
