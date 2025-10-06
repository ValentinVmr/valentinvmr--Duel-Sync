const parser = require('../../utils/useParseData')();
const tossCoinUseCase = require('../../../components/toss_coin');

module.exports = (socket, payload) => {
    const { roomId } = parser.parse(payload);
    const userId = socket.id;

    const { tossResult } = tossCoinUseCase.execute({ roomId, userId });

    const responsePayload = JSON.stringify({ tossResult });
    socket.emit('coin-tossed', responsePayload);
    socket.to(roomId).emit('coin-tossed', responsePayload);
}