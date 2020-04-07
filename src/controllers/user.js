const User = require('../models/user');
// Signup Controller
const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    // Initiate Save
    await user.save();

    // Return User
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Login Controller
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
  } catch (error) {
    res.status(400).send({ error });
  }
};

module.exports = {
  createUser,
  loginUser,
};
