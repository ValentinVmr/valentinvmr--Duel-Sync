const joinRoomUseCase = require('../../../components/join_room');
const User = require("../../../domain/user");
const log = require("npmlog");

module.exports = (socket, roomId) => {
    const command = {
        roomId: roomId.slugged(),
        user: new User(socket.id),
    }

    const room = joinRoomUseCase.execute(command);

    socket.join(roomId);

    const playersDataWithRoomId = room.getPlayersData();
    const data = {
        playersData: playersDataWithRoomId,
        roomId: roomId,
        timer: room.getTimer(),
        configuration: room.getConfiguration()
    }

    socket.emit("room-joined", JSON.stringify(data));
    socket.to(roomId).emit("user-joined", socket.id);
    log.info(`User ${socket.id} joined room ${roomId}`);
};
