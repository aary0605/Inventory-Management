const bcrypt = require("bcrypt");

getHash = async (password) => {
    return await bcrypt.hash(password, 10);
};

compareHash = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
module.exports = {getHash,compareHash};