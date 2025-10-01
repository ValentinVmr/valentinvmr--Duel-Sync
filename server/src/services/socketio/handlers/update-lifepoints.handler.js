const updateLifePointsUseCase = require('../../../components/update_lifepoints');
const useParser = require('../../utils/useParseData')();

module.exports = (socket, payload) => {
    const { roomId, playerId, operation, amount } = useParser.parse(payload);

    const updatedPlayersData = updateLifePointsUseCase.execute(
        socket.id,
        roomId,
        playerId,
        operation,
        amount
    );

    const stringifiedData = JSON.stringify({
        roomId: updatedPlayersData.id,
        playersData: updatedPlayersData.data
    });

    socket.emit('life-points-updated', stringifiedData);
    socket.to(roomId).emit('life-points-updated', stringifiedData);
}
