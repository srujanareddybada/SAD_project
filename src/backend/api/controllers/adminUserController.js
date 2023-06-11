const User = require("../models/userModel");
const { default: mongoose } = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

// Update user balance
const getAllUsersAsync = async (req, res) => {
  await User.find({ admin: false })
    .then((users) => {
      if (users) {
        // Users found
        console.log(users);
        res.status(200).json({
          message: `Successfully Found ${users.length} users`,
          users: users,
        });
      } else {
        res.status(404).json({ message: "Not Found!" });
        // User not found
        console.log("No user was not found");
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Something went wrong!" });

      console.error(err);
      // Handle the error
    });
};

// Update blocking of user by admin
const updateBlockUserAsync = async (req, res) => {
  const { blocked } = req.body;
  console.log(blocked);
  var docId = new ObjectId(req.params.id);
  console.log(req.params.id);

  User.updateOne({ _id: docId }, { blocked: blocked })
    .then((result) => {
      // Document updated successfully

      res.status(200).json({
        message: blocked ? "Successfully blocked" : "Successfully unblocked",
        result,
      });
    })
    .catch((err) => {
      // Error occurred during the update
      console.error("Error occurred during update:", err);
      return new Error(err);
    });
};

module.exports = {
  getAllUsersAsync,
  updateBlockUserAsync,
};
