const user = require('../db/models/user')
const jwt = require('jsonwebtoken')
const becrypt = require( 'bcrypt')
const catchAsync = require('../catchAsync')
const AppError = require('../appError')
const generateToken = (payload) =>{
 return jwt.sign(payload,process.env.JWT_SECRET_KEY ,{
    expiresIn:process.env.JWT_EXPIRES_IN
 })
}
const signup = catchAsync (async(req,res,next) => {
     const body = req.body;
     
     if(!["1","2"].includes(body.userType)){
      throw new AppError('Invalid user type',400)  
     }
    
  const newUser = await user.create({
    userType:body.userType, 
    firstName: body.firstName,
    lastName:body.lastName,
    email:body.email,
    password:body.password,
    confirmPassword:body.confirmPassword
    
  });
  console.log(newUser);
  
  if(!newUser){

    return next(new AppError('Failed to create user',400))
    }

  const result = newUser.toJSON();
  delete result.password;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id
  }
  )

 
    return res.status(201).json({
        status:'success',
        data:result
    })
});





const login = catchAsync ( async (req,res,next) => {
  const {email,password} = req.body;
  console.log(email);
  console.log(password);
  
  if(!email||!password){
    return next(new AppError('Provide email and password',400))
  }
  const result = await user.findOne({where : {email}})

  console.log(result);
  
   if(!result||!(await becrypt.compare(password,result.password))){
    return next(new AppError('Incorrect email or password',401))
   }
   const token = generateToken({
    id:result.id
   })
   return res.status(200).json({
    status:'sucess',
    message:'Login successfuly!',
    token
   })
  
})
 module.exports = { signup ,login };