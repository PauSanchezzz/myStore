//crear todos los middlewares

//Capturar cualquier error
function logErrors(error, req, res, next) {
  console.error(error);
  next(error);
}

//Captura un error y crea un formato para devolverlo
function errorHandler(error, req, res, next) {
  // console.log('errorHandler');
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}

function boomErrorHandler(error, req, res, next) {
  if (error.isBoom) {
    //si esa propiedad existente dentro del error es de tipo boom
    const { output } = error; //Toda la información del boom esta dentro de output
    res.status(output.statusCode).json(output.payload);
  } else {
    next(error);
  }
}

export { logErrors, boomErrorHandler, errorHandler };
//export default errorHandler;
