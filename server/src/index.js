const { io, server } = require('./services/socketio');
const handleUserEvents = require('./services/socketio/handle-user-events');
const log = require("npmlog");

process.on('uncaughtException', function (err) {
    log.error('Caught exception: ' + err);
});

io.on('connection', (socket) => {
    log.info(`User ${socket.id} connected`);
    handleUserEvents(socket);
});

io.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
});

server.listen(3000, () => {
    log.info("Server listening on port 3000");
});
