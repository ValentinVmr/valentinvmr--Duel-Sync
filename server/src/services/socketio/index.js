const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    rejectUnauthorized: false,
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

String.prototype.slugged = function () {
    return this.toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-');
};

module.exports = {io, server}
