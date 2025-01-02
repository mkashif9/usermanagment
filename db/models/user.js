'use strict';
const {
  Model,
  Sequelize,
  DataTypes
} = require('sequelize');
const sequelize = require('../../config/database')
const becrypt = require('bcrypt');
const AppError = require('../../appError');
module.exports = sequelize.define('user',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userType: {
      type: DataTypes.ENUM('0','1','2'),
      allowNull:false,
      validate :{
        notNull:{
          msg:"UserType cannot be null"
        },
        notEmpty:{
          msg:'UserTpe cannot be Empaty'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate :{
        notNull:{
          msg:"FirstName cannot be null"
        },
        notEmpty:{
          msg:'FirstName  cannot be Empaty'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false,
      validate :{
        notNull:{
          msg:"LastName cannot be null"
        },
        notEmpty:{
          msg:'LastName  cannot be Empaty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      validate :{
        notNull:{
          msg:"Email cannot be null"
        },
        notEmpty:{
          msg:'Email  cannot be Empaty'
        },
        isEmail:{
          msg:"Invalid Email id"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate :{
        notNull:{
          msg:"Password cannot be null"
        },
        notEmpty:{
          msg:'Password  cannot be Empaty'
        },
      
      }
    },
    confirmPassword:{
    
      type: DataTypes.VIRTUAL ,
      set(value){
        if(value === this.password){
          const hashPassword =  becrypt.hashSync(value,10)
          this.setDataValue('password',hashPassword);
        }
        else{
          throw new AppError("Password and confirm password  must be same",400 )
        }
      }
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt:{
      type:DataTypes.DATE,
    }
  },
  {
    paranoid:true,
    freezeTableName:true,
    modelName:'user'
  }
)