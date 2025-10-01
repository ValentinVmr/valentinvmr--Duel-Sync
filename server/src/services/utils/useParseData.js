const log = require("npmlog");
module.exports = () => {
    return {
        parse: (data) => {
            try {
                return JSON.parse(data || "{}");
            } catch (error) {
                log.error(error);
                return {};
            }
        }
    }
}