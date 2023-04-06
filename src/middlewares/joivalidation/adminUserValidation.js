import Joi from "joi";
 export const newAdminUserValidation = (req, res, next) => {
    try {
        // define rules
        const schema = Joi.object({
          firstName: Joi.string().max(20).required(),
          lastName: Joi.string().max(20).required(),
          email: Joi.string().email({ minDomainSegments: 2 }),
          phone: Joi.string().max(100).required(),
          dob: Joi.date().allow("", null),
          address: Joi.string().max(100).allow("", null),
          password: Joi.string().max(100).required(),
        });
        // give data to the rules
      const { error } = schema.validate(req.body);
      if (error) {
        error.status = 200;
        return next(error);
      }
      next();
    } catch (error) {
        next(error);
    }
}