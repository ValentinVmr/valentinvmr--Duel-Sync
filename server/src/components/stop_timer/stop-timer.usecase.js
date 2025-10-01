module.exports = class StopTimerUseCase {
    constructor(checkIfUserInRoomUseCase, timerManager) {
        this.checkIfUserInRoomUseCase = checkIfUserInRoomUseCase;
        this.timerManager = timerManager;
    }

    execute({roomId, userId}) {
        this.checkIfUserInRoomUseCase.execute({roomId, userId});

        if (this.timerManager.isTimerRunning(roomId)) {

            this.timerManager.stopTimer(roomId);
        }
    }
}