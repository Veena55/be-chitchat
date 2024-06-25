// An annotation to handle errors for all controller by calling it with @thismiddlewarename before defining any controller
const withErrorHandling = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};

module.exports = withErrorHandling;
