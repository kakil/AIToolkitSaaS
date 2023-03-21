const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken(res);
    res.status(statusCode).json( { success: true, token });
}

//Register user account, check if user email exists, create user account
exports.register = async (req, res, next) => {
    const { username, email, password } = req.body;

    const existing_email = await User.findOne({email});

    if (existing_email) {
        return next(new ErrorResponse("Email already is in use", 400));
    }

    try {
        const user = await User.create({ username, email, password });
        sendToken(user, 201, res);
    } catch (err) {
        console.log(err)
        next(err);
    }
}


//Login user
exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorResponse("Please provide an email and/or password", 400));
    }

    try {
        //check that user already exists by email
        const user = await User.findOne({email}).select("+password");
        if (!user) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        //check that password matches
        const isMatch = await user.matchPasswords(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401));
        }

        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};


//Logout user
exports.logout = (req, res) => {
    res.clearCookie('refreshToken');
    return res.status(200).json({ success: true, message: "Logged out" });
};


//Get Token
exports.getRefreshToken = async (req, res, next) => { 
    try {
        const getToken = req.cookies.refreshToken;

        if (getToken) {
            const token = jwt.verify(getToken, process.env.APPSETTING_JWT_REFRESH_SECRET);
            const accessToken = jwt.sign({ id: token.id }, process.env.APPSETTING_JWT_ACCESS_SECRET, { expiresIn: process.env.APPSETTING_JWT_ACCESS_EXPIRE });
            res.status(200).json(accessToken);
        }
    } catch (err) {
        console.log("hello")
        return next(err);
    }
    
}


//Get user subscription info
exports.getSubscription = async (req, res, next) => { 
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ subscription: user.subscription });
    } catch (err) {
        next(err);
    }
}


//Get customer info
exports.getCustomer = async (req, res, next) => { 
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({ customerId: user.customerId });
    } catch (err) {
        next(err);
    }
}

//
exports.getRefreshToken = async (req, res, next) => {
    
    try {
        const getToken = req.cookies.refreshToken;

        if(getToken) {
            const token = jwt.verify(getToken, process.env.JWT_REFRESH_SECRET);
            const accessToken = jwt.sign({ id: token.id }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRE });
            res.status(200).json({accessToken});
        }
    }catch (err) {
        next(err);
    }
}

