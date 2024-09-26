import User from "../../../models/userModel.js";

//create a new user
const createUser = async (email) => {
    const user = new User({ email });
    return await user.save();
};

//get user details by email
const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export { createUser, findUserByEmail};
