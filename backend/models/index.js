const User = require("./user");

const initModels = async () => {
    await User.sync(); // Syncs the User model with the database
};

module.exports = initModels;
