export const validateRule = (req, res) => {
  const {
    rule: { field, condition, condition_value },
  } = req.body;

  const { data } = req;


  let result = false;

  try {
    switch (condition) {
      case 'eq':
        if (data === condition_value) {
          result = true;
        }
        break;
      case 'neq':
        if (data !== condition_value) {
          result = true;
        }
        break;
      case 'gt':
        if (Number(data) > Number(condition_value)) {
          result = true;
        }
        break;
      case 'gte':
        if (Number(data) >= Number(condition_value)) {
          result = true;
        }
        break;
      case 'contains':
        if (data.includes(condition_value)) {
          result = true;
        }
        break;

      default:
        break;
    }

    if (!result) {
      throw Error();
    }
    return res.status(200).send({
      message: `field ${field} successfully validated.`,
      status: 'success',
      data: {
        validation: {
          error: false,
          field: `${field}`,
          field_value: data,
        //   field_value: typeof data === "object" ? data : req.body.data,
          condition,
          condition_value,
        },
      },
    });
  } catch (error) {
    return res.status(400).send({
      message: `field ${field} failed validation.`,
      status: 'error',
      data: {
        validation: {
          error: true,
          field: `${field}`,
          field_value: data,
          condition,
          condition_value,
        },
      },
    });
  }
};
