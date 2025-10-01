const removeUserUseCase = require("../../../components/remove_user");
const log = require("npmlog");

module.exports = function () {
    log.info(`User ${this.id} is disconnecting`);

    const self = this;
    const rooms = [...(self.rooms || [])].slice(1);

    rooms.forEach(function(roomId){
        self.to(roomId).emit('user left', self.id + 'left');
        removeUserUseCase.execute({ roomId, userId: self.id })
    });
}
