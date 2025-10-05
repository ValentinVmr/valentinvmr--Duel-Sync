const RollDiceUseCase = require('../../../components/roll_dice');
const parser = require('../../utils/useParseData')();

module.exports = (socket, data) => {
    const {roomId} = parser.parse(data);
    const userId = socket.id;

    const {dieResult} = RollDiceUseCase.execute({roomId, userId});

    const payload = JSON.stringify({dieResult});
    socket.emit('dice-rolled', payload);
    socket.to(roomId).emit('dice-rolled', payload);
}