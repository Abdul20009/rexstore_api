const User = require("../models/user")
const { attachCookiesToResponse,  } = require("../utilis")

const signup = async (req, res) => {
    try{
        const {fullName, email, password} = req.body;
    const existingEmail = await User.findOne({email});

    if(existingEmail){
       return res.status(400).json({msg: "email already in use"});
    }

    const user = await User.create({ fullName, email, password})
    const tokenUser = { fullName: user.fullName, email: user.email, password: user.password };
  const token = attachCookiesToResponse({ res, user: tokenUser });

    res.status(200).json({msg: "signup successfully", user, token});
    }catch (error){
        res.status(400).json({error});
        console.log(error)
    }
}

const signin = async (req, res) => {
    const { email, password } = req.body;
  if (!email || !password) {
  return  res.status(400).json({msg: "Please provide email and password"});
  }
  const user = await User.findOne({ email });

  if (!user) {
  return  res.status(400).json({msg: "email is not existing"});
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
  return  res.status(400).json({msg: "inavalid credentials"});
  }
  const tokenUser = { fullName: user.fullName, email: user.email, password: user.password };
  const token = attachCookiesToResponse({ res, user: tokenUser });
  res.status(201).json({ user: tokenUser, token });
}

module.exports = {signup, signin};