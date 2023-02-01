const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { genSalt } = require("bcrypt");
const { generateToken } = require("../config/jwtToken");


const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    if (!findUser) {
        // Create new User
        const newUser = await User.create(req.body);
        res.json(newUser);
    } else {
        throw new Error("user already exists")
    }
});

// login
const loginUserControll = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    // check if user exists or not
    const findUser = await User.findOne({email});
    if (findUser && (await findUser.isPasswordMatched(password))) {
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("invalid credentials");
    }
});

module.exports = { createUser, loginUserControll };
