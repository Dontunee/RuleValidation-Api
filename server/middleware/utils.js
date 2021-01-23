export const validator = (schema, reqObj) => {
  return async (...arg) => {
    return await joiHandler(schema, ...arg, reqObj);
  };
};

const joiHandler = async (schema, req, res, next, reqObj = {}) => {
  try {
    await schema.validateAsync({
      ...req.body,
    });

    return next();
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      status: 'error',
      data: null,
    });
  }
};

export const validateDataField = (req, res, next) => {
  try {
    const {
      rule: { field },
      data,
    } = req.body;

    const array = field.split('.');

    if (array.length > 2) {
      throw new Error('Field nesting can not be more than two levels.');
    }

    const filteredArray = array.filter((obj) => obj);

    if (filteredArray.length < 1) {
      throw new Error('No field supplied.');
    }

    const doesDataHaveFirstField = data.hasOwnProperty(filteredArray[0]);

    if (!doesDataHaveFirstField) {
      throw new Error(`Field ${filteredArray[0]} is missing from data.`);
    }

    if (filteredArray.length === 1) {
      req.data = data[filteredArray[0]];
      return next();
    }

    const doesDataHaveInnerField = data[filteredArray[0]].hasOwnProperty(
      filteredArray[1]
    );

    if (!doesDataHaveInnerField) {
      throw new Error(`Field ${filteredArray[1]} is missing from data.`);
    }

    req.data = data[filteredArray[0]][filteredArray[1]];

    return next();
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      status: 'error',
      data: null,
    });
  }
};
