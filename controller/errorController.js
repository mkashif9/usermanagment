
const AppError = require("../appError");

const sendErrorDev = (error,res) => {
    const statusCode = error.statusCode||500;
    const status = error.status||'error';
    const stack = error.stack;
    const message= error.message
   return res.status(statusCode).json({
        status,
        message,
        stack,
    })

    
}
const sendErrorProd = (error,res) => {
    const statusCode = error.statusCode||500;
    const status = error.status||'error';
    const stack = error.stack;
    const message= error.message

    if(error.isOperational){
        return res.status(statusCode).json({
            status,
            message
        })
    }
    console.log(error.message, error.name , stack);
    
    return res.status(500).json({
        status: "error",
        message: "Somthing went very wrong"
    })

}
const golbalErrorHandler = (err,req,res,next) =>{
    if(err.name === "SequelizeValidationError")
        {
           err = new AppError(err.errors[0].message,400)
        }
     if(err.name === "SequelizeUniqueConstraintError")
     {
        err = new AppError(err.errors[0].message,400)
     }
     if(process.env.NODE_ENV === 'devlopment'){
        return sendErrorDev (err,res);
     }
     return sendErrorProd(err,res)
}
module.exports = golbalErrorHandler;