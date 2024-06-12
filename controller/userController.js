const User = require('./../model/userModel');
const jwt = require('jsonwebtoken');
const CustomErr = require('./../Utils/CustomErr');
const util=require('util');
const asyncErrorHandler = require('./../Utils/asyncErrorHandler');
const sendEmail = require('./../Utils/email');
const crypto = require('crypto');

const signToken = id => {
  return  jwt.sign({ id }, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES

    });
}
const createSendResponse = (user, statusCode, res) => {
    const token=signToken(user._id);

    res.status(statusCode).json({
        status: 'success',
        token:token,
        data: {
            user
        }
    });
}
const filterReqObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(prop => {
        if (allowedFields.includes(prop))
        newObj[prop] = obj[prop];
    })
    return newObj;
}

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
    //get the current user data from database
    //because it is called after protect we can find the id
   const user= await User.findById(req.user._id).select('+password');
      //2,check the password
    if (!(await user.comparePasswordInDb(req.body.currentPassword, user.password))) {
        
        return next(new CustomErr("current password you provided is wrong", 401));
    }

    
//if they are same 
user.password = req.body.password;
user.confirmPassword = req.body.confirmPassword;
await user.save();


    //login and tokenize
    createSendResponse(user, 200, res);

// const token = signToken(user._id);
// res.status(200).json({
//     status: 'success',
//     token,
//     data: {
//         user 
//     }
// })
})
exports.updateMe = asyncErrorHandler(async (req, res, next) => {
    if (req.body.password || req.body.confirmPassword) {
        return next(new CustomErr("You can not update your password using this endpoints!!!"), 400);
    }
    const filterObj = filterReqObj(req.body,'name','email');
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { runValidators: true, new: true });


     createSendResponse(user, 200, res);
});

exports.deleteMe = asyncErrorHandler(async (req, res, next) => {

    const user= await User.findByIdAndUpdate(req.user._id, { active: false });
    res.status(204).json({
        status: "success",
        message: "successfully deleted",
        data:null
})

})
exports.getAllUser = asyncErrorHandler(async (req, res, next) => {

    const user = await User.find();
    res.status(200).json({
        status: 'success',
        result: user.length,
        data: {
            user
        }
    })
})
