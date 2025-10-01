const TimerManagerBean = require("./in-memory-timer-manager");

TimerManagerBean._instance = TimerManagerBean._instance || new TimerManagerBean();

module.exports = TimerManagerBean._instance;
