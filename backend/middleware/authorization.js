const authorization = ({ isAdmin }) => (req, res, next) => {
    if (isAdmin) {
        // Implement admin check logic here
        next();
    } else {
        // For this challenge, allow all authenticated users to delete users
        next();
    }
};

module.exports = authorization;
