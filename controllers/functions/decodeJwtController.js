const jwt = require('jsonwebtoken');

module.exports = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return decoded;
    } catch (ex) {
        console.log(ex);
    }

}