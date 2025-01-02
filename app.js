require('dotenv').config({path:`${process.cwd()}/.env`})
const express = require('express');

const authRouter = require('./routes/authRoute');
const catchAsync = require('./catchAsync');
const AppError = require('./appError');
const { stack } = require('sequelize/lib/utils');
const golbalErrorHandler = require('./controller/errorController');

const app = express();
 
app.use(express.json())


// all routes go here
app.use('/api/v1/auth',authRouter);

app.use(
    '*',
    catchAsync(async(req,res,next) =>
    {
     throw new AppError(`Can't fin reuqested ${req.originalUrl} on this server `,404);
    })
);
app.use(golbalErrorHandler)

const PORT = process.env.APP_PORT || 4000
app.listen(PORT, () => {
     console.log("Server up and  running ",PORT)
});