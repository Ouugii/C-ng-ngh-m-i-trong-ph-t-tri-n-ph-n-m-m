const ATMUser = require("../models/atm");

// Controller cho API đăng nhập
const login = async (req, res) => {
  const { accountID, password } = req.body;

  try {
    const user = await ATMUser.findOne({ accountID, password });

    if (user) {
      res.status(200).json({
        message: "Login success!",
        accountID: user.accountID,
        name: user.name,
        money: user.money,
      });
    } else {
      res
        .status(401)
        .json({ message: "Login failed! Invalid accountID or password." });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

// Controller cho API đăng ký
const register = async (req, res) => {
  const { accountID, password, money, name } = req.body;

  if (!accountID || !password || !money || !name) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const existingUser = await ATMUser.findOne({ accountID });

    if (existingUser) {
      return res.status(400).json({ message: "AccountID already exists!" });
    }

    const newUser = new ATMUser({ accountID, password, money, name });
    await newUser.save();

    res.status(201).json({ message: "Account registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  login,
  register,
};
