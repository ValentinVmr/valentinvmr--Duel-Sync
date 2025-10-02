module.exports = class ResetDuelUseCase {
    constructor(roomManager, checkUserInRoom, timerService) {
        this.roomManager = roomManager;
        this.checkUserInRoom = checkUserInRoom;
        this.timerService = timerService;
    }

    execute({roomId, userId}) {
        this.checkUserInRoom.execute({roomId, userId});

        const room = this.roomManager.getRoom(roomId);

        if(this.timerService.isTimerRunning(roomId)) {
            this.timerService.stopTimer(roomId);
        }

        room.resetRoom();
        this.roomManager.update(roomId, room);

        return room;
    }
}