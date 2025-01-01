const updateLifePointsUseCase = require('../../../components/update_lifepoints');
const log = require("npmlog");

module.exports = (socket, payload) => {
    var parseData;

    try {
        parseData = JSON.parse(payload || "{}");
    } catch (error) {
        log.error(error);
        return;
    }

    const { roomId, playerId, operation, amount } = parseData;

    const updatedPlayersData = updateLifePointsUseCase.execute(
        socket.id,
        roomId,
        playerId,
        operation,
        amount
    );

    delete updatedPlayersData.users;

    const stringifiedData = JSON.stringify(updatedPlayersData);

    socket.emit('life-points-updated', stringifiedData);
    socket.to(roomId).emit('life-points-updated', stringifiedData);
}
