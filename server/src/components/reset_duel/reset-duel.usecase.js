module.exports = class ResetDuelUseCase {
    constructor(roomManager, checkUserInRoom, timerService) {
        this.roomManager = roomManager;
        this.checkUserInRoom = checkUserInRoom;
        this.timerService = timerService;
    }

    execute({roomId, userId}) {
        this.checkUserInRoom.execute({roomId, userId});

        const room = this.roomManager.getRoom(roomId);
        this.timerService.stopTimer(roomId);
        return room.resetRoom();
    }
}