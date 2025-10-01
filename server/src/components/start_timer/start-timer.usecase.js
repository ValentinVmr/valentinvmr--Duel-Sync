module.exports = class StartTimerUseCase {
    constructor(checkIfUserInRoomUseCase, roomManager, timerManager) {
        this.checkIfUserInRoomUseCase = checkIfUserInRoomUseCase;
        this.roomManager = roomManager;
        this.timerManager = timerManager;
    }

    execute({ roomId, userId, onTickCallback, onCompleteCallback }) {
        this.checkIfUserInRoomUseCase.execute({ roomId, userId });

        const room = this.roomManager.getRoom(roomId);

        if (!this.timerManager.isTimerRunning(roomId)) {
            const onTick = () => {
                room.tickTimer();
                if (!!onTickCallback) onTickCallback(room);
            }

            const onComplete = () => {
                if (!!onCompleteCallback) onCompleteCallback(room);
            }

            this.timerManager.startTimer(roomId, room.data.timer, onTick, onComplete);
        }
    }
}