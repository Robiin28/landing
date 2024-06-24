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
    const options = {
        maxAge: process.env.LOGIN_EXPIRES,
        httpOnly:true
    }
    if (!process.env === 'development') {
        options.secure.true;
    }
    res.cookie('jwt', token, options);
    res.status(statusCode).json({
        status: 'success',
        token:token,
        data: {
            user
        }
    });
}
exports.signup = asyncErrorHandler(async (req, res, next) => {

    newUser = await User.create(req.body);
    newUser.password = undefined;
    createSendResponse(newUser, 201, res);
    // const token = signToken(newUser._id);

    // res.status(201).json({
    //     status: 'success',
    //     token:token,
    //     data: {
    //         user:newUser
    //     }

    
    // });
});
exports.login=asyncErrorHandler(async (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        const error = new CustomErr("invalid email or password", 400);
        return next(error);
    }
    const user = await User.findOne({ email }).select(`+password`);
    if (!user) {
           const error = new CustomErr("no user exist with this email", 400);
           
        return next(error);
       }
        if(!user.active) {
        return next(new Error("user does not exist anymore"),401);
    }
    
        
       
    const isMatch=await user.comparePasswordInDb(password,user.password)
    //    ..check
    if (!user || !isMatch) {
        const error = new CustomErr("incorrect email or password", 400);
        return next(error);
    }
       
     

    createSendResponse(user, 200, res);
//      const token=signToken(user._id);
//     res.status(200).json({
//         status: "success",
//         token
        
// })
})

exports.protect=asyncErrorHandler(async (req, res,next)=>{
    //1,read th token check
    let token;
    const testToken = req.headers.authorization;
    if (testToken && testToken.startsWith('Bearer')) {
        token=testToken.split(' ')[1];
    }
    if (!token) {
        next(new CustomErr('you are not logged in'), 401);
    }
    //2,validate the token
const decodedToken=await util.promisify(jwt.verify)(token,process.env.SECRET_STR);


    //3,if user is logged in exists
  const user=await User.findById(decodedToken.id);
    if (!user) {
        const error = new CustomErr('the user does not exist anymore with this token', 401);
        return next(error);
      }

    //4, also check if you user change the password
    const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);
    if (isPasswordChanged) {
        const error = new CustomErr('the password changed recently. please login again!!', 401);
        return next(error);
    }
    //5,allow user to access routes
    req.user = user;
    next();
})

//if it is multiple parameter
//...role
//to accept more
//(!role.includes(req.user.role)){}



exports.restrict = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            const error=new CustomErr("You are not authorized to perform this action", 401);
       next(error);
        }
        next();
    }
}
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    
    const user = await User.findOne({ email: req.body.email });
  if (!user.active) {
        return next(new Error("user does not exist anymore"),401);
    }

    if (!user) {
      return next(new CustomErr('We could not find the user', 404));
    }
    //2, generate a random reset token
    const resetToken = user.createResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    //3,send th token back to th email
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Password Reset</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                background-color: #ffffff;
                padding: 20px;
                margin: 50px auto;
                max-width: 600px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #4CAF50;
                color: #ffffff;
                padding: 10px 0;
                text-align: center;
            }
            .content {
                margin: 20px 0;
                line-height: 1.6;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                font-size: 16px;
                color: #ffffff;
                background-color: #4CAF50;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                margin-top: 20px;
                text-align: center;
                color: #777777;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset Request</h1>
            </div>
            <div class="content">
                <p>Hi,</p>
                <p>We received a request to reset your password. Please click the button below to reset your password:</p>
                <p><a href="${resetUrl}" class="button">Reset Password</a></p>
                <p>If you did not request a password reset, please ignore this email. This link will expire in 10 minutes.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        await sendEmail({
            email: user.email,
            subject: "password change request received",
            message: "use your link",
            html:message
        });

        res.status(200).json({
            status: 'success',
            message:"password reset email send to user email"
        })
    }
    catch (err) {
        user.passwordResetToken= undefined;
        user.passwordResetTokenExpires= undefined;
        user.save({ validateBeforeSave: false });

        return next(new CustomErr("there was an error sending password reset email.please try again later"),500);
    }



})

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ 
        passwordResetToken: token, 
        passwordResetTokenExpire: { $gt: Date.now() } 
    });

    if (!user) {
        return next(new CustomErr("Token is invalid or has expired", 400));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.password; // Ensure confirmPassword matches the new password
    user.passwordResetTokenExpire = undefined;
    user.passwordResetToken = undefined;
    user.passwordChangedAt = Date.now();

    await user.save(); // Save the updated user
createSendResponse(user, 200, res);
    // const logToken = signToken(user._id);
    // res.status(200).json({
    //     status: "success",
    //     token: logToken
    // });
});
