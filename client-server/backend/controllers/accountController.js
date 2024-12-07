const ATMUser = require("../models/atm");

// Controller cho API xem thông tin tài khoản
const getAccount = async (req, res) => {
  const accountID = parseInt(req.params.accountID, 10);

  try {
    const user = await ATMUser.findOne({ accountID });

    if (user) {
      res.status(200).json({
        accountID: user.accountID,
        name: user.name,
        money: user.money,
      });
    } else {
      res.status(404).json({ message: "Account not found!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

module.exports = {
  getAccount,
};
