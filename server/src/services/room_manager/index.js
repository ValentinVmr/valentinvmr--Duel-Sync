const RoomManagerBean = require("./in-memory-room-manager");

RoomManagerBean._instance = RoomManagerBean._instance || new RoomManagerBean();

module.exports = RoomManagerBean._instance;
