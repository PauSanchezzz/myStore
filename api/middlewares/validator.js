import boom from '@hapi/boom';
//middleware dinamico
function validatorHandler(schema, property) {
  return (req, res, next) => {
    //data guardra la información de manera dinamica
    const data = req[property];
    //guarda en la variable error los datos validados en el método
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

export default validatorHandler;
