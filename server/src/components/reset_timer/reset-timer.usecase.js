module.exports = class ResetTimerUseCase {
    constructor(checkIfUserInRoomUseCase, roomManager, timerManager) {
        this.checkIfUserInRoomUseCase = checkIfUserInRoomUseCase;
        this.roomManager = roomManager;
        this.timerManager = timerManager;
    }

    execute({roomId, userId}) {
        this.checkIfUserInRoomUseCase.execute({roomId, userId});

        const room = this.roomManager.getRoom(roomId);

        if (this.timerManager.isTimerRunning(roomId)) {
            this.timerManager.stopTimer(roomId);
        }

        room.resetTimer();
        return room.getTimer();
    }
}