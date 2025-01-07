const { Sequelize } = require("sequelize");
const catchAsync = require("../catchAsync");
const user = require("../db/models/user");


const getAllUsers = catchAsync(async (req,res,next)=>{
    const users = await user.findAndCountAll({
        where:{
            userType:{
                [Sequelize.Op.ne]:'0',
            },
        },
        attributes:{exclude:['password'],}
    })
     return res.status(200).json({
        status:"success",
        data:users
     })
})

 module.exports = {getAllUsers}