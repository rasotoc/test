const router = require("express").Router();
const User = require("../models/user");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//validation
const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .required(),
  email: Joi.string()
    .min(6)
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required()
});

//Submit Post
router.post("/register", async (req, res) => {
  const validation = schema.validate(req.body);
  console.log(validation);
  //if(validation) return res.status(400).send(validation)
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(req.body.password, salt);
  console.log(hashpassword);
  //create user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashpassword,
    created: req.body.created
  });
  //checking if the user is on th db
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("email already exist");

  try {
    const savedPost = await user.save();
    res.json({ user: user._id });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const validation = schema.validate(req.body);
  console.log(validation);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not registry");
  //password correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("email or password ir wrong");
  //create and assing a token
  //const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
  const token = jwt.sign({ _id: user._id }, "jkfhaisjloaiduql");
  res.header("auth-token", token).send(token);
  //res.send('logged in!')
});

module.exports = router;
